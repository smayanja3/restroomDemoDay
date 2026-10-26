const editForm = document.querySelector('#editF')
const deleteBtn = document.querySelector('#danger')

// PUT ======================================================================
//---- edit form on the edit page
if(editForm) {
    editForm.addEventListener('submit',(e) => {
        e.preventDefault()

        const id = editForm.dataset.id

        fetch(`/restrooms/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify({
                name: document.getElementById('name').value,
                address: document.getElementById('address').value,
                isFree: document.getElementById('isFree').checked,
                is24Hours: document.getElementById('is24Hours').checked
            }),
        })
        .then(res => res.json())
        .then(data => {
            consol.log(data)
            window.location.href = `/restrooms/${id}`
        })
        .catch(err => console.log(err))
    })
}



// DELETE ===================================================================
//---- delete button on the show page

if(deleteBtn) {
    deleteBtn.addEventListener('submit', () => {

        const id = deleteBtn.dataset.id
        
        fetch(`restrooms/${id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            window.location.href = '/restrooms/new'
        })
        .catch(err => console.log(err))
    })
       
}