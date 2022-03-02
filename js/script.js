const form = document.getElementById("form");
const input = document.getElementById("input");

const avatar = document.getElementById("avatar");
const repos = document.getElementById("repos");
const followers = document.getElementById("followers");
const following = document.getElementById("following");
const join = document.getElementById("join");
const nome = document.getElementsByClassName("nome");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    getApi(input.value.toLowerCase())
        .then((response) => {
            avatar.src = response.avatar_url;
            repos.innerHTML = response.public_repos;
            followers.innerHTML = response.followers;
            following.innerHTML = response.following;
            join.innerHTML = formatarData(response.created_at);

            for (var i = 0; i < nome.length; ++i) {
                nome[i].innerHTML = input.value.toLowerCase();
            }
        })
        .catch((err) => {
            for (var i = 0; i < nome.length; ++i) {
                nome[i].innerHTML = 'Undefined';
            }
        });

});

function getApi(nome, link = "") {
    link != "" ? (link = `/${link}`) : (link = ``);
    return new Promise((resolve, reject) => {
        fetch(`https://api.github.com/users/${nome}${link}`)
            .then((response) => {
                if (response.status == 404) {
                    reject(response.message);
                }
                resolve(response.json());
            })
            .catch((error) => {
                reject(error);
            });
    });
}

function formatarData(dataParam) {
    let data = new Date(dataParam);
    let dataFormatada =
        "Criada em: " +
        data.getDate() +
        "/" +
        (data.getMonth() + 1) +
        "/" +
        data.getFullYear();
    return dataFormatada;
}
