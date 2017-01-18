/**
 * Created by Олександр on 18.01.2017.
 */

import questionsData from "./questions";
import usersData from "./users";

let loadAllData = () => {
    questionsData.initData();
    usersData.initData();
};

module.exports = {
    loadAllData,
}



