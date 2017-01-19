/**
 * Created by Олександр on 18.01.2017.
 */

import questionsData from "./questions";
import usersData from "./users";

let loadAllData = () => {
    questionsData.initData();
    usersData.initData();
    console.log("Data is loaded");
};

module.exports = {
    loadAllData,
};



