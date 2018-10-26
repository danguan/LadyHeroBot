const roles = require('./roles.json');

function handleRole(suffix, member, availableRoles) {
  return new Promise((res, rej) => {
    if (roles['age'].hasOwnProperty(suffix)) {
      handleAssignRole('age', suffix, member, availableRoles, res);
    } else if (roles['gender'].hasOwnProperty(suffix)) {
      handleAssignRole('gender', suffix, member, availableRoles, res);
    } else if (roles['color'].hasOwnProperty(suffix)) {
      handleAssignRole('color', suffix, member, availableRoles, res);
    } else if (roles['job'].hasOwnProperty(suffix)) {
      handleAssignRole('job', suffix, member, availableRoles, res);
    } else if (suffix === 'help') {
      handleRoleHelp(res);
    } else {
      rej();
    }
  });
}

function handleAssignRole(type, suffix, member, availableRoles, res) {
  const typedRole = roles[type][suffix];
  const roleId = availableRoles.find('name', typedRole);

  for (const role in roles[type]) {
    const currRoleId = availableRoles.find('name', roles[type][role]).id;
    if (member.roles.has(currRoleId)) {
      member.removeRole(currRoleId);
    }
  }

  member.addRole(roleId);

  res(`Role ${typedRole} added to ${member.displayName}`);
}

function handleRoleHelp(res) {
  let helpMsg =
    'Role![role] or role![role]  →  Assigns the specified role to you (case insensitive)\n\n' +
    'Type Role!help to get a list of all available roles\n\n' +
    'Available roles:\n';

  for (const roleType in roles) {
    let properRoleType = roleType.replace(/\b\w/g, l => l.toUpperCase());
    helpMsg += properRoleType + ':\n';

    for (const role in roles[roleType]) {
      helpMsg += role + ', ';
    }

    helpMsg += '\n\n';
  }

  helpMsg = helpMsg.substring(0, helpMsg.length - 2);

  res(helpMsg);
}

module.exports = {
  handleRole
};
