const roles = require('./roles.json');

function handleRole(suffix, member, availableRoles) {
  return new Promise((res, rej) => {
    if (suffix === 'help') {
      handleRoleHelp(res);
    } else if (suffix.substring(0, 6) === 'remove') {
      let removeType = suffix.substring(6);
      handleRemoveRole(removeType, member, availableRoles, res, rej);
    } else {
      for (const roleType in roles) {
        if (roles[roleType].hasOwnProperty(suffix)) {
          handleAssignRole(roleType, suffix, member, availableRoles, res);
        }
      }
    }
    rej();
  });
}

function handleAssignRole(type, suffix, member, availableRoles, res) {
  const typedRole = roles[type][suffix];
  const roleId = availableRoles.find('name', typedRole);

  handleRemoveRole(type, member, availableRoles);

  member.addRole(roleId);

  res(`Role ${typedRole} added to ${member.displayName}`);
}

function handleRemoveRole(type, member, availableRoles, res, rej) {
  let removed = false;

  for (const role in roles[type]) {
    const currRoleId = availableRoles.find('name', roles[type][role]).id;
    if (member.roles.has(currRoleId)) {
      member.removeRole(currRoleId);
      removed = true;
    }
  }

  if (res && removed === true) {
    let properType = type.replace(/\b\w/g, l => l.toUpperCase());
    res(`${properType} role removed from ${member.displayName}`);
  } else if (res && !removed) {
    rej();
  }
}

function handleRoleHelp(res) {
  let helpMsg =
    'Role![role] or role![role]  →  Assigns the specified role to you (case insensitive)\n\n' +
    'Type Role!help to get a list of all available roles\n\n' +
    'Available roles:\n';
  let removeMsg =
    '\nRole!remove[role type] or role!remove[role type]  →  Removes the specified role type from you\n\n' +
    'Available removal commands:\n';

  for (const roleType in roles) {
    let properRoleType = roleType.replace(/\b\w/g, l => l.toUpperCase());
    helpMsg += properRoleType + ':\n';

    for (const role in roles[roleType]) {
      helpMsg += role + ', ';
    }

    helpMsg = helpMsg.substring(0, helpMsg.length - 2) + '\n\n';
    removeMsg += 'role!remove' + roleType + ', ';
  }

  removeMsg = removeMsg.substring(0, removeMsg.length - 2);

  res(helpMsg + removeMsg);
}

module.exports = {
  handleRole
};
