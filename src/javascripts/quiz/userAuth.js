/**
 * Created by Олександр on 09.01.2017.
 */

function authAsUser(user) {
    // var template = Handlebars.compile(render.config[user.group].template);
    // render.main.innerHTML = template(user);
    window.location.href = "#quiz.html";
}

module.exports = {
    authAsUser: authAsUser,

};