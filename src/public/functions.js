function getPeople() {
    fetch('/api/people')
        .then((res) => res.json())
        .then((data) => {
            const personColorList = document.getElementById('person-color-list');
            personColorList.innerHTML = '';

            data.forEach((person) => {
                const personDiv= document.createElement('div');
                personDiv.style.display = 'flex';
                personDiv.style.flexDirection = 'row';
                personDiv.style.alignItems = 'center';
                personDiv.style.justifyContent = 'center';
                personDiv.style.margin = '10px';
                personDiv.style.gap = '10px';
                
                const personColorDot = document.createElement('div');
                personColorDot.style.backgroundColor = person.color;
                personColorDot.style.width = '25px';
                personColorDot.style.height = '25px';
                personColorDot.style.margin = '10px';
                personColorDot.style.borderRadius = '50%';
                personDiv.appendChild(personColorDot);

                const personName = document.createElement('h2');
                personName.textContent = person.name;
                personDiv.appendChild(personName);

                personColorList.appendChild(personDiv);
            });
        });
}

function fetchPeople() {
    getPeople();
    setInterval(getPeople, 10000);
}