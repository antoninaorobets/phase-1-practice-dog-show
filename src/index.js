const dbURL = "http://localhost:3000/dogs"


document.addEventListener('DOMContentLoaded', () => {
    getDogsIngo();
    const form = document.querySelector('#dog-form')
    form.addEventListener('submit', updateDdogsDb)
})

function getDogsIngo() {
    fetch(dbURL).then(resp => resp.json()).then(displayAllDogs).catch(error => console.error(error))
}


function Dog(id ,name,breed,sex) {
    this.id = id
    this.name = name
    this.breed = breed
    this.sex = sex
}

function displayAllDogs(data) {
    const table = document.querySelector('#table-body')
    table.innerHTML = ''
    data.forEach(element => {
        const line = document.createElement('tr')
        line.dataset.dogId = element.id
        const td = document.createElement('td')
        const editButton = document.createElement('button')
        editButton.textContent = "Edit"
        editButton.dataset.id = element.id
        editButton.addEventListener('click', getDogToEditForm)
        td.appendChild(editButton)

        line.innerHTML =
            `<td name="name">${element.name}</td>` +
            `<td name="breed">${element.breed}</td>` +
            `<td name="sex">${element.sex}</td>`
        line.append(td)
        table.append(line)
    });
}

function getDogToEditForm(event) {

    const dogId = event.target.dataset.id
    const form = document.querySelector('#dog-form')
    form.dataset.dogId = dogId
    const line = document.querySelector(`tr[data-dog-id="${dogId}"]`)

    const inputName = form.querySelector('input[name="name"]')
    inputName.value = line.querySelector('td[name="name"]').textContent
    const breed = form.querySelector('input[name="breed"]')
    breed.value = line.querySelector('td[name="breed"]').textContent
    const sex = form.querySelector('input[name="sex"]')
    sex.value = line.querySelector('td[name="sex"]').textContent
}

function updateDdogsDb(event) {
    event.preventDefault()
    const updatedDog = new Dog(
        event.target.dataset.dogId, 
        event.target.querySelector('input[name="name"]').value,
        event.target.querySelector('input[name="breed"]').value,
        event.target.querySelector('input[name="sex"]').value)

    fetch(dbURL + `/${dogId}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(updatedDog)
    })
        .then((response) => response.json())
        .then()
        .catch((error) => console.error(error.message))
    getDogsIngo()
    event.target.reset()
    event.target.dataset.dogId = ''
}