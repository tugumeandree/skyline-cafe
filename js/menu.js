
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready())
} else {
    ready()
}

function ready() {
    var removeItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeItemButtons.length; i++) {
        var button = removeItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantity = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantity.length; i++) {
        var input = quantity[i]
        input.addEventListener('change', quantityChanged)
    }

    var addButtons = document.getElementsByClassName('add-order')
    for (var i = 0; i < addButtons.length; i++) {
        var button = addButtons[i]
        button.addEventListener('click', )
    }

    document.getElementsByClassName('btn-order')[0].addEventListener('click', )
}

function placeOrderClicked() {
    alert('Thank you for your order')
    var orderItems = document.getElementsByClassName('order-items')[0]
    while (orderItems.hasChildNodes()) {
        orderItems.removeChild(orderItems.firstChild)
    }
    updateorderTotal()
}

function removeOrderItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateOrderTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateOrderTotal()
}

function addToOrderClicked(event) {
    var button = event.target
    var shopItem = button.parentElement
    var title = shopItem.getElementsByClassName('item-name')[0].innerText
    var price = shopItem.getElementsByClassName('item-price')[0].innerText
    addItemToCart(title, price)
    updateOrderTotal()
}

function addItemToOrder(title, price) {
    var orderRow = document.createElement('div')
    orderRow.classList.add('order-row')
    var orderItems = document.getElementsByClassName('order-items')[0]
    var orderItemNames = orderItems.getElementsByClassName('order-item-title')
    for (var i = 0; i < orderItemNames.length; i++) {
        if (orderItemNames[i].innerText == title) {
            alert('This item is already added to the order')
            return
        }
    }
    var orderRowContents = `
        <div class="order-item order-column">
            <span class="item-name">${title}</span>
        </div>
        <span class="item-price order-column">Shs{price}</span>
        <div class="order-quantity order-column">
            <input class="order-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    orderRow.innerHTML = orderRowContents
    orderItems.append(orderRow)
    orderRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeOrderItem)
    orderRow.getElementsByClassName('order-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateTotal() {
    var orderItemContainer = document.getElementsByClassName('order-items')[0]
    var orderRows = orderItemContainer.getElementsByClassName('order-row')
    var total = 0
    for (var i = 0; i < orderRows.length; i++) {
        var orderRow = orderRows[i]
        var priceElement = orderRow.getElementsByClassName('item-price')[0]
        var quantityElement = orderRow.getElementsByClassName('order-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('Shs', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('total-price')[0].innerText = 'Shs' + total
}

