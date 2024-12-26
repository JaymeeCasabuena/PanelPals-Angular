const moment = require("moment");

const formatDiscussionDates = (discussions) => {
  return discussions.map((discussion) => ({
    ...discussion,
    DateCreated: moment(discussion.DateCreated).fromNow(),
  }));
};

module.exports = { formatDiscussionDates };
