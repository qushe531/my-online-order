// 初始化订单数据（从 localStorage 加载）
let orderData = JSON.parse(localStorage.getItem('orderData')) || [];

// 渲染订单列表
function renderOrder() {
  const tbody = document.getElementById('order-body');
  tbody.innerHTML = '';
  
  let total = 0;
  orderData.forEach((item, index) => {
    const subtotal = item.price * item.quantity;
    total += subtotal;
    
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.price.toFixed(2)}</td>
      <td>
        <button onclick="changeQuantity(${index}, -1)">-</button>
        ${item.quantity}
        <button onclick="changeQuantity(${index}, 1)">+</button>
      </td>
      <td>${subtotal.toFixed(2)}</td>
      <td><button onclick="removeItem(${index})">删除</button></td>
    `;
    tbody.appendChild(row);
  });
  
  document.getElementById('total-price').textContent = total.toFixed(2);
}

// 添加菜品
function addItem() {
  const name = document.getElementById('item-name').value.trim();
  const price = parseFloat(document.getElementById('item-price').value);
  
  if (name && !isNaN(price) && price >= 0) {
    orderData.push({ name, price, quantity: 1 });
    saveOrder();
    renderOrder();
    
    // 清空输入框
    document.getElementById('item-name').value = '';
    document.getElementById('item-price').value = '';
  } else {
    alert('请输入有效的菜品名称和价格！');
  }
}

// 修改数量
function changeQuantity(index, delta) {
  if (orderData[index].quantity + delta > 0) {
    orderData[index].quantity += delta;
    saveOrder();
    renderOrder();
  }
}

// 删除菜品
function removeItem(index) {
  orderData.splice(index, 1);
  saveOrder();
  renderOrder();
}

// 保存到 localStorage
function saveOrder() {
  localStorage.setItem('orderData', JSON.stringify(orderData));
}

// 初始化渲染
renderOrder();
