const roles = require('./roles.json');

function handleRole(suffix, member, availableRoles) {
  return new Promise((res, rej) => {
    if (roles['age'].hasOwnProperty(suffix)) {
      const ageRole = roles['age'][suffix];
      const roleId = availableRoles.find('name', ageRole);

      for (const role in roles['age']) {
        const currRoleId = availableRoles.find('name', roles['age'][role]).id;
        if (member.roles.has(currRoleId)) {
          member.removeRole(currRoleId);
        }
      }

      member.addRole(roleId);

      res(`Role ${ageRole} added to ${member.displayName}`);
    } else if (roles['gender'].hasOwnProperty(suffix)) {
      const genderRole = roles['gender'][suffix];
      const roleId = availableRoles.find('name', genderRole);
      for (const role in roles['gender']) {
        const currRoleId = availableRoles.find('name', roles['gender'][role])
          .id;
        if (member.roles.has(currRoleId)) {
          member.removeRole(currRoleId);
        }
      }

      member.addRole(roleId);

      res(`Role ${genderRole} added to ${member.displayName}`);
    } else if (suffix === 'help') {
      let helpMsg =
        'Role![role] or role![role]  →  Assigns the specified role to you (case insensitive)\n\n' +
        'Type Role!help to get a list of all available roles\n\n' +
        'Available roles:\n' +
        'Age:\n';

      for (const ageRole in roles['age']) {
        helpMsg += ageRole + ', ';
      }

      helpMsg += '\n\n' + 'Gender:\n';

      for (const genderRole in roles['gender']) {
        helpMsg += genderRole + ', ';
      }

      helpMsg = helpMsg.substring(0, helpMsg.length - 2);

      res(helpMsg);
    } else {
      rej();
    }
  });
}

module.exports = {
  handleRole
};
