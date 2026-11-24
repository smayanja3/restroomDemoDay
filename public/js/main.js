const editForm = document.querySelector('#editF')
const userLocation = document.querySelector('#userLocation')

// PUT ======================================================================
//---- edit form on the edit page
if (editForm) {
    editForm.addEventListener('submit', (e) => {
        e.preventDefault()

        const id = editForm.dataset.id

        fetch(`/restrooms/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                //removed name because i dont want the user to change it
                isFree: document.getElementById('isFree').checked,
                is24Hours: document.getElementById('is24Hours').checked,
                hours: document.getElementById('hours').value,
                babyChanging: document.getElementById('babyChanging').checked
            }),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                window.location.href = '/restrooms'
            })
            .catch(err => console.log(err))
    })
}

// GET LOCATION ===================================================================
//----
userLocation.addEventListener('click', (grabL) => {
console.log('Hello User')
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log(position.coords.latitude, position.coords.longitude);
            },
            (error) => {
                console.error("Location error:", error.message);
            }
        );
    }
})


// DELETE ===================================================================
//---- 
