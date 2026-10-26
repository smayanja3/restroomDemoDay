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
                is24Hours: document.getElementById('is24Hours').checked,
                hours: document.getElementById('hours').value,
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



// DELETE ===================================================================
//---- delete button on the show page

if(deleteBtn) {
    deleteBtn.addEventListener('click', () => {
        const id = deleteBtn.dataset.id
        const sure = confirm('Delete this restroom')

        if (!sure) return
        
        fetch(`/restrooms/${id}`, {
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