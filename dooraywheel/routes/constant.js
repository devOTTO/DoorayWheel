exports.regexp = /([^\s\"]+)|\"([^"]*)\"/g;   // (GroupWithoutSpace) "(Group with space)"
exports.MINIMUM_PARAMS_LENGTH = 10;   //  ('', Group 1, Group 2) * 3

exports.MSG_TYPE = {
    HELP: 'HELP',
};

exports.MSG_TEXT = {
    HELP: '`/wheel` Help:\n`/wheel number Drawer1 Drawer2 "Drawer with space"...`',
}