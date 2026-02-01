let orders = JSON.parse(localStorage.getItem("orders") || "[]");

function saveOrders() {
  localStorage.setItem("orders", JSON.stringify(orders));
}

function fetchOrders() {
  const table = document.getElementById("orderTable");
  table.innerHTML = '<tr><th>No</th><th>Username</th><th>Layanan</th><th>Pr>
  orders.forEach((o,i)=>{
    let row = table.insertRow();
    row.innerHTML = `<td>${i+1}</td>
                     <td>${o.username}</td>
                     <td>${o.layanan}</td>
                     <td>${o.progress}/${o.jumlah}</td>
                     <td class="${o.status}">${o.status}</td>`;
  });
}

function addOrder() {
  const username = document.getElementById("username").value;
  const layanan = document.getElementById("layanan").value;
  const jumlah = parseInt(document.getElementById("jumlah").value);
  if(!username || !jumlah) return alert("Username & jumlah harus diisi!");
  orders.push({username, layanan, jumlah, progress:0, status:"pending"});
  saveOrders();
  document.getElementById("username").value = "";
  document.getElementById("jumlah").value = "";
  fetchOrders();
}

// Auto process order tiap 2 detik
setInterval(()=>{
  let changed = false;
  for(let o of orders){
    if(o.status !== "completed"){
      o.status = "processing";
      o.progress += Math.floor(Math.random()*50)+10;
      if(o.progress >= o.jumlah){
        o.progress = o.jumlah;
        o.status = "completed";
      }
      changed = true;
    }
  }
  if(changed) saveOrders();
  fetchOrders();
},2000);

fetchOrders();
