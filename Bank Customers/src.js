let customers = JSON.parse(localStorage.getItem('customers')) || []
let accountNumberStart = customers.length == 0 ? 548205482 : customers[customers.length-1]['accountNumber']
let es;
const modal = document.getElementById("myModal");

function addNewCustomer(name,balance){
    let customer = {
        id:customers.length == 0 ? 1 :customers[customers.length-1]['id']+1,
        name:name,
        balance:balance,
        accountNumber: ++accountNumberStart
    }
    customers.push(customer)
    localStorage.setItem('customers',JSON.stringify(customers))
    ShowCustomers()
}
function createNewElement(tag,content){
    let el = document.createElement(tag)
    el.innerText = content
    return el
}

function returnCustomer(id){
    let el;
    let index;
    customers.forEach((ele,i)=>{
        // console.log(ele)
        if( ele['id'] == id) 
        { 
            el = ele;
            index = i
        }
    })
    return [el,index];
}

function changeBalance(e){
    modal.style.display = "block";
    const id = e.target.parentElement.id
    const customer = returnCustomer(id)
    document.querySelector('#modalCustomer').value = customer[0]['name']
    document.querySelector('#modalAccount').value = customer[0]['balance']
    document.querySelector('#index').value = customer[1]
}

function ShowCustomers(customer=customers){
    const tbody = document.querySelector('table tbody');
    tbody.innerHTML = '';
    customer.forEach(element => {
        const tr = createNewElement('tr','')
        tr.id = element['id']
        tr.addEventListener('click',changeBalance)
        let td = createNewElement('th',element['id'])
        tr.appendChild(td)
        td = createNewElement('td',element['name'])
        tr.appendChild(td)
        td = createNewElement('td',element['accountNumber'])
        tr.appendChild(td)
        td = createNewElement('td',element['balance']+'$')
        tr.appendChild(td)
        tbody.appendChild(tr)
    });
    
}

document.getElementById('addNewButton').addEventListener('click',function(e){
    // addNewCustomer('mohamed',5000)
    document.querySelector('#addCustomerContainer').classList.toggle('d-none')
    this.textContent = this.textContent=='Add New customer' ? 'Hide New Customer' : 'Add New customer'
})

document.querySelector('#addNewCustomer').addEventListener('submit',function(e){
    e.preventDefault();
    if(e.target[0].value.length==0 || isNaN(e.target[1].value)) return
    addNewCustomer(e.target[0].value,e.target[1].value)
    e.target.reset()
    document.getElementById('addNewButton').click()
})

ShowCustomers()
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
document.querySelector('#addAmount').addEventListener('click',function(e){
    const balance = parseFloat(customers[parseInt(document.querySelector('#index').value)]['balance'])
    const amount = parseFloat(document.querySelector('#modalchange').value)
    if(isNaN(amount)) return
    customers[parseInt(document.querySelector('#index').value)]['balance'] = amount + balance;
    localStorage.setItem('customers',JSON.stringify(customers))
    modal.style.display = "none";
    document.querySelector('#modalchange').value = ''
    ShowCustomers()
})
document.querySelector('#withdrawAmount').addEventListener('click',function(e){
    const balance = parseFloat(customers[parseInt(document.querySelector('#index').value)]['balance'])
    const amount = parseFloat(document.querySelector('#modalchange').value)
    // console.log(balance,amount,)
    if(amount > balance || isNaN(amount)) return
    customers[parseInt(document.querySelector('#index').value)]['balance'] = balance - amount;
    localStorage.setItem('customers',JSON.stringify(customers))
    modal.style.display = "none";
    document.querySelector('#modalchange').value = ''
    ShowCustomers()
})

document.querySelector('#delete').addEventListener('click',function(e){
    customers.splice(parseInt(document.querySelector('#index').value),1)
    
    localStorage.setItem('customers',JSON.stringify(customers))
    modal.style.display = "none";
    document.querySelector('#modalchange').value = ''
    ShowCustomers()
})


document.querySelector('#search').addEventListener('input',function(e){
    const customerS = customers.filter(function (e) {
        return e.accountNumber.toString().includes(document.querySelector('#search').value)
    });
    ShowCustomers(customerS)
})