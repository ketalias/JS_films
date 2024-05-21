
// Об'єкт фільм
class Film {
    constructor(name, director, url, year, money) {
        this._id = GenerateId();
        this.name = name;
        this.director = director;
        this.url = url;
        this.year = year;
        this.money = money;
    }

    get id() {
        return this._id;
    }
}

// Перевантаження toString
class CustomFilm extends Film {
    toString() {
        return `Film ID: ${this.id}, Title: ${this.name}, Director: ${this.director}, Year: ${this.year}, Box Office: ${this.money}`;
    }
}

class FilmCollection {
    constructor() {
        this.films_collection = [];
    }

    add(film) {
        this.films_collection.push(film);
    }

    update(id, updatedFilm) {
        const index = this.films_collection.findIndex(film => film.id === id);
        if (index !== -1) {
            this.films_collection[index] = updatedFilm;
        }
    }

    getFilmById(id) {
        return this.films_collection.find(film => film.id === id);
    }
}

let filmCollection = new FilmCollection();

function GenerateId() {
    return Math.floor(Math.random() * (19999 - 10001)) + 10000;
}

// Додавання фільму
function addFilm() {
    let name = document.getElementById("title").value;
    let director = document.getElementById("director").value;
    let url = document.getElementById("url").value;
    let year = document.getElementById("year").value;
    let money = document.getElementById("box-office").value;

    let film = new CustomFilm(name, director, url, year, money);
    filmCollection.add(film);

    let table = document.getElementById("filmsTable");
    let tableBody = table.getElementsByTagName('tbody')[0];
    let newRow = tableBody.insertRow();

    let cell1 = newRow.insertCell(0);
    let cell2 = newRow.insertCell(1);
    let cell3 = newRow.insertCell(2);
    let cell4 = newRow.insertCell(3);
    let cell5 = newRow.insertCell(4);
    let cell6 = newRow.insertCell(5);

    cell1.textContent = film.name;
    cell2.textContent = film.director;
    cell3.textContent = film.url;
    cell4.textContent = film.year;
    cell5.textContent = film.money;
    cell6.textContent = film.id;
}

// Оновлення даних фільму
function updateFilm() {
    let id = parseInt(document.getElementById("film-id").value);
    let film = filmCollection.getFilmById(id);

    if (film) {
        film.name = document.getElementById("film-title").value || film.name;
        film.director = document.getElementById("film-director").value || film.director;
        film.url = document.getElementById("film-url").value || film.url;
        film.year = document.getElementById("film-year").value || film.year;
        film.money = document.getElementById("film-box-office").value || film.money;

        let table = document.getElementById("filmsTable");
        let tableBody = table.getElementsByTagName('tbody')[0];
        let rows = tableBody.getElementsByTagName('tr');

        for (let row of rows) {
            if (parseInt(row.cells[5].textContent) === id) {
                row.cells[0].textContent = film.name;
                row.cells[1].textContent = film.director;
                row.cells[2].textContent = film.url;
                row.cells[3].textContent = film.year;
                row.cells[4].textContent = film.money;
                break;
            }
        }
    } else {
        alert(`Film not found`);
    }
}