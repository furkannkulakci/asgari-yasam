// Variables - Değişkenler

const navBottomAlert = document.querySelector('.alert');
const updateTotalAlert = document.querySelector('.alert-cost');
const closeAlert = document.querySelector('.close-alert');
const updateCloseAlert = document.querySelector('.credit-cost-alert');
const info = document.querySelector('.info');
const infoClose = document.querySelector('.info-close');
const navTop = document.querySelector('.nav-top');
const navBottom = document.querySelector('.nav-bottom');
const body = document.querySelector('body');
const mainContent = document.querySelector('.main-content');
const cartItem = document.querySelectorAll('.cart-item');
const cartButton = document.querySelectorAll('.addtocart');
const goldBtn = document.querySelector('.goldbutton');
const bill = document.querySelector('#bill');
const billContent = document.querySelector('.bill-content');
const closeBill = document.querySelector('.cross-bill');
const bottomNumber = document.querySelector('.bottom-number');
const billList = document.getElementsByClassName('bill-list');

// Constructor
class Shopping {
  constructor(title, price, image) {
    this.image = image;
    this.title = title;
    this.price = price;
  }
}

// UI
class UI {
  cartButton(shopping) {
    const listItem = document.createElement('div');
    listItem.classList = 'bill-list';
    listItem.innerHTML = `
        <ul>
        <li> <img src="${shopping.image}" class="productimage" alt="image" /> </li>
        <li> ${shopping.title} </li>
        <li class="bill-row">${shopping.price}₺</li>
        </ul>
        `;

    billContent.appendChild(listItem);
    updateTotalCost();
  }
}

// carts
for (let i = 0; i < cartItem.length; i++) {
  cartButton[i].addEventListener('click', e => {
    // product title
    let title =
      cartItem[i].getElementsByClassName('productname')[0].textContent;
    // prodcut price
    let price = parseFloat(
      cartItem[i]
        .getElementsByClassName('price')[0]
        .textContent.replace('₺', '')
    );
    // product image
    let image = cartItem[i]
      .getElementsByClassName('productimage')[0]
      .getAttribute('src');
    // disabled
    cartButton[i].textContent = 'Ödendi';
    cartButton[i].classList.add('added');
    // assignment
    let shopping = new Shopping(title, price, image);
    // add ui
    let ui = new UI();
    // cartButton
    ui.cartButton(shopping);

    e.preventDefault();
  });
}

// total cost
function updateTotalCost() {
  var total = 0;

  for (var i = 0; i < billList.length; i++) {
    var singleList = billList[i];
    var priceList = parseFloat(
      singleList
        .getElementsByClassName('bill-row')[0]
        .textContent.replace('₺', '')
    );
    total = total + priceList;
  }
  if (total <= 5500) {
    document.getElementsByClassName('total-cost')[0].innerText = total;
    document.getElementById('expense').innerText = total;
    let editMoney = (document.getElementById('remiender').innerText =
      5500 - total);
    document.getElementsByClassName('money')[0].innerText = editMoney;

    // cart count
    let billList = billContent.getElementsByClassName('bill-list');
    let bottomCount = document.getElementById('bill-count');
    bottomCount.innerHTML = billList.length;
  } else if (total > 10000) {
    document.getElementsByClassName('edit-money')[0].innerText =
      -(5500 - total) + '₺' + ' Böbrek ile ödendi ';
    document.getElementsByClassName('edit-icon')[0].innerText = '';
    let billList = billContent.getElementsByClassName('bill-list');
    let bottomCount = document.getElementById('bill-count');
    bottomCount.innerHTML = 'Böbrek';
    bill.classList.add('bill-open');
    document.getElementsByClassName('mtn')[0].innerText =
      'Bu ay yapılan harcamalar yatırılan 5 bin 500 lira 35 kuruşun anasını ağlattı. Yaptığın toplam harcama ' +
      total +
      ' lira, bu ay ' +
      -(5500 - total) +
      ' lira için böbreğinden oldun.';
    document.getElementsByClassName('to')[0].innerText = 'Bedel';
    document.getElementsByClassName('total-cost')[0].innerText = -(
      5500 - total
    );
    body.classList.add('o-hid');
    updateTotalAlert.classList.add('show');
  } else {
    body.classList.add('o-hid');
    updateTotalAlert.classList.add('show');
    document.getElementsByClassName('edit-money')[0].innerText =
      'Güncel Borç ' + -(5500 - total) + '₺';
    document.getElementsByClassName('edit-icon')[0].innerText = '';

    bill.classList.add('bill-open');
    document.getElementsByClassName('mtn')[0].innerText =
      'Bu ay yapılan harcamalar yatırılan 5 bin 500 lira 35 kuruşu aştı. Yaptığın toplam harcama ' +
      total +
      ' lira, bu ay ' +
      -(5500 - total) +
      ' lira devlete borçlandın.';
    document.getElementsByClassName('to')[0].innerText = 'Borç';
    document.getElementsByClassName('total-cost')[0].innerText = -(
      5500 - total
    );
  }
  // alert cost
  updateTotalAlert.getElementsByClassName('expense-total')[0].innerText =
    'Bu ay ' +
    -(5500 - total) +
    '₺ borçlandın daha da borçlanmak istiyorsan karta tıkla! ';
}
updateTotalCost();

// navbar top and bottom
window.onscroll = function () {
  if (window.pageYOffset >= mainContent.offsetTop) {
    navTop.classList.add('sticky');
    navBottom.classList.add('sticky');
    info.classList.add('d-none');
  } else {
    navTop.classList.remove('sticky');
    navBottom.classList.remove('sticky');
  }
};

// nav bottom (bill)
navBottom.addEventListener('click', () => {
  if (bottomNumber.textContent != 0) {
    bill.classList.add('bill-open');
    body.classList.add('o-hid');
  } else {
    navBottomAlert.classList.add('show');
    body.classList.add('o-hid');
  }
});
// update close alert
updateCloseAlert.addEventListener('click', () => {
  updateTotalAlert.classList.remove('show');
});

// close alert
closeAlert.addEventListener('click', () => {
  navBottomAlert.classList.remove('show');
  body.classList.remove('o-hid');
});

// close bill
closeBill.addEventListener('click', () => {
  bill.classList.remove('bill-open');
  body.classList.remove('o-hid');
});

// info close
infoClose.addEventListener('click', () => {
  info.classList.add('d-none');
});
