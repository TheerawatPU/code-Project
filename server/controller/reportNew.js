import db from "../db.js";

// todo 1 วัตถุดิบ
// วัตถุดิบทั้งหมด
export const Report_Stable_all = (req, res) => {
  const sql =
    "SELECT s.id_staple, s.Name_staple ,s.Name_INCIname,s.reOrder, COALESCE(l.cost, 0) AS cost , COALESCE(l.amount_re, 0) AS amount_re FROM staple s LEFT JOIN ( SELECT id_staple, MAX(id_lot) AS latest_lot_id, cost , amount_re FROM lots GROUP BY id_staple ) AS latest_lots ON s.id_staple = latest_lots.id_staple LEFT JOIN lots l ON latest_lots.latest_lot_id = l.id_lot  ORDER BY id_staple";
  // "SELECT staple.id_staple,staple.Name_staple ,staple.Name_INCIname,staple.reOrder , lots.cost , lots.amount FROM staple INNER JOIN lots ON staple.id_staple = lots.id_staple WHERE lots.expiration_date = (SELECT MAX(expiration_date) FROM lots WHERE lots.id_staple = staple.id_staple) GROUP BY staple.id_staple";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
};

// เลือกวัตถุดิบตาม option
export const Report_Stable_date = (req, res) => {
  const { view } = req.params;
  let sql = "";

  switch (view) {
    case "วัตถุดิบทั้งหมด":
      sql =
        "SELECT s.id_staple, s.Name_staple ,s.Name_INCIname,s.reOrder, COALESCE(l.cost, 0) AS cost , COALESCE(l.amount_re, 0) AS amount_re FROM staple s LEFT JOIN ( SELECT id_staple, MAX(id_lot) AS latest_lot_id, cost , amount_re FROM lots GROUP BY id_staple ) AS latest_lots ON s.id_staple = latest_lots.id_staple LEFT JOIN lots l ON latest_lots.latest_lot_id = l.id_lot  ORDER BY id_staple";
      break;
    case "วัตถุดิบต่ำกว่าจุดสั่งซื้อ":
      sql =
        "SELECT s.id_staple, s.Name_staple ,s.Name_INCIname,s.reOrder, COALESCE(l.cost, 0) AS cost , COALESCE(l.amount_re, 0) AS amount_re FROM staple s LEFT JOIN ( SELECT id_staple, MAX(id_lot) AS latest_lot_id, cost , amount_re FROM lots GROUP BY id_staple ) AS latest_lots ON s.id_staple = latest_lots.id_staple LEFT JOIN lots l ON latest_lots.latest_lot_id = l.id_lot WHERE s.reOrder > l.amount_re ORDER BY id_staple";
      break;
    case "วัตถุดิบคงเหลือมากสุด":
      sql =
        "SELECT s.id_staple, s.Name_staple ,s.Name_INCIname,s.reOrder, COALESCE(l.cost, 0) AS cost , COALESCE(l.amount_re, 0) AS amount_re FROM staple s LEFT JOIN ( SELECT id_staple, MAX(id_lot) AS latest_lot_id, cost , amount_re FROM lots GROUP BY id_staple ) AS latest_lots ON s.id_staple = latest_lots.id_staple LEFT JOIN lots l ON latest_lots.latest_lot_id = l.id_lot  ORDER BY  l.amount_re DESC";
      break;
    case "วัตถุดิบคงเหลือน้อยสุด":
      sql =
        "SELECT s.id_staple, s.Name_staple ,s.Name_INCIname,s.reOrder, COALESCE(l.cost, 0) AS cost , COALESCE(l.amount_re, 0) AS amount_re FROM staple s LEFT JOIN ( SELECT id_staple, MAX(id_lot) AS latest_lot_id, cost , amount_re FROM lots GROUP BY id_staple ) AS latest_lots ON s.id_staple = latest_lots.id_staple LEFT JOIN lots l ON latest_lots.latest_lot_id = l.id_lot  ORDER BY  l.amount_re ASC";
      break;
    case "วัตถุดิบราคามากสุด":
      sql =
        "SELECT s.id_staple, s.Name_staple ,s.Name_INCIname,s.reOrder, COALESCE(l.cost, 0) AS cost , COALESCE(l.amount_re, 0) AS amount_re FROM staple s LEFT JOIN ( SELECT id_staple, MAX(id_lot) AS latest_lot_id, cost , amount_re FROM lots GROUP BY id_staple ) AS latest_lots ON s.id_staple = latest_lots.id_staple LEFT JOIN lots l ON latest_lots.latest_lot_id = l.id_lot  ORDER BY  l.cost DESC";
      break;
    case "วัตถุดิบราคาน้อยสุด":
      sql =
        "SELECT s.id_staple, s.Name_staple ,s.Name_INCIname,s.reOrder, COALESCE(l.cost, 0) AS cost , COALESCE(l.amount_re, 0) AS amount_re FROM staple s LEFT JOIN ( SELECT id_staple, MAX(id_lot) AS latest_lot_id, cost , amount_re FROM lots GROUP BY id_staple ) AS latest_lots ON s.id_staple = latest_lots.id_staple LEFT JOIN lots l ON latest_lots.latest_lot_id = l.id_lot  ORDER BY  l.cost ASC";
      break;
    default:
      sql =
        "SELECT s.id_staple, s.Name_staple ,s.Name_INCIname,s.reOrder, COALESCE(l.cost, 0) AS cost , COALESCE(l.amount_re, 0) AS amount_re FROM staple s LEFT JOIN ( SELECT id_staple, MAX(id_lot) AS latest_lot_id, cost , amount_re FROM lots GROUP BY id_staple ) AS latest_lots ON s.id_staple = latest_lots.id_staple LEFT JOIN lots l ON latest_lots.latest_lot_id = l.id_lot  ORDER BY id_staple";
  }

  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
};

// แปุ่มปรับสต๊อกจากมากไปน้อย น้อยไปมาก
export const Report_Stable_button_sort = (req, res) => {
  const { column, order } = req.params;
  let sql = "";

  switch (order) {
    case "asc":
      sql = `SELECT s.id_staple, s.Name_staple ,s.Name_INCIname,s.reOrder, COALESCE(l.cost, 0) AS cost , COALESCE(l.amount_re, 0) AS amount_re FROM staple s LEFT JOIN ( SELECT id_staple, MAX(id_lot) AS latest_lot_id, cost , amount_re FROM lots GROUP BY id_staple ) AS latest_lots ON s.id_staple = latest_lots.id_staple LEFT JOIN lots l ON latest_lots.latest_lot_id = l.id_lot  ORDER BY ${column} ASC`;
      break;
    case "desc":
      sql = `SELECT s.id_staple, s.Name_staple ,s.Name_INCIname,s.reOrder, COALESCE(l.cost, 0) AS cost , COALESCE(l.amount_re, 0) AS amount_re FROM staple s LEFT JOIN ( SELECT id_staple, MAX(id_lot) AS latest_lot_id, cost , amount_re FROM lots GROUP BY id_staple ) AS latest_lots ON s.id_staple = latest_lots.id_staple LEFT JOIN lots l ON latest_lots.latest_lot_id = l.id_lot  ORDER BY ${column} DESC`;
      break;
    default:
      sql =
        "SELECT s.id_staple, s.Name_staple ,s.Name_INCIname,s.reOrder, COALESCE(l.cost, 0) AS cost , COALESCE(l.amount_re, 0) AS amount_re FROM staple s LEFT JOIN ( SELECT id_staple, MAX(id_lot) AS latest_lot_id, cost , amount_re FROM lots GROUP BY id_staple ) AS latest_lots ON s.id_staple = latest_lots.id_staple LEFT JOIN lots l ON latest_lots.latest_lot_id = l.id_lot ";
  }

  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
};

// todo 1 วัตถุดิบ ---------------------------------------------

// todo2 สั่งซื้อวัตถุดิบ
//สั่งซื้อวัตถุดิบทั้งหมด
export const Report_buy_stable_all = (req, res) => {
  const sql =
    "SELECT `id_buylist`,DATE_FORMAT(day_buy, '%d/%m/%Y') AS day_buy,DATE_FORMAT(day_admit_staple, '%d/%m/%Y') AS  day_admit_staple,`store`,`cost_price`,`total_cost`,`refer_id`,`note` FROM `buy_staple` ORDER BY `id_buylist` DESC";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
};

//สั่งซื้อวัตถุดิบ ค้นหาตามวันที่เริ่มต้น - สิ้นสุด
export const Report_buy_stable_date = (req, res) => {
  const { start_date, end_date } = req.query;
  const sql =
    "SELECT `id_buylist`,DATE_FORMAT(day_buy, '%d/%m/%Y') AS day_buy,DATE_FORMAT(day_admit_staple, '%d/%m/%Y') AS  day_admit_staple,`store`,`cost_price`,`total_cost`,`refer_id`,`note` FROM `buy_staple` WHERE `day_buy` BETWEEN ? AND ? ORDER BY `id_buylist` DESC";
  db.query(sql, [start_date, end_date], (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
};

//สั่งซื้อวัตถุดิบ  ปุ่มกด วันเดือนปี
export const Report_buy_stable_button_date = (req, res) => {
  const { view } = req.params;
  let sql = "";

  switch (view) {
    case "เลือกช่วงวันที่":
      sql =
        "SELECT `id_buylist`,DATE_FORMAT(day_buy, '%d/%m/%Y') AS day_buy,DATE_FORMAT(day_admit_staple, '%d/%m/%Y') AS  day_admit_staple,`store`,`cost_price`,`total_cost`,`refer_id`,`note` FROM `buy_staple` ORDER BY `id_buylist` DESC";
      break;
    case "week":
      sql =
        "SELECT `id_buylist`,DATE_FORMAT(day_buy, '%d/%m/%Y') AS day_buy,DATE_FORMAT(day_admit_staple, '%d/%m/%Y') AS  day_admit_staple,`store`,`cost_price`,`total_cost`,`refer_id`,`note` FROM `buy_staple` WHERE WEEK(`day_buy`) = WEEK(NOW())  ORDER BY `id_buylist` DESC";
      break;
    case "month":
      sql =
        "SELECT `id_buylist`,DATE_FORMAT(day_buy, '%d/%m/%Y') AS day_buy,DATE_FORMAT(day_admit_staple, '%d/%m/%Y') AS  day_admit_staple,`store`,`cost_price`,`total_cost`,`refer_id`,`note` FROM `buy_staple` WHERE MONTH(`day_buy`) = MONTH(NOW())  ORDER BY `id_buylist` DESC";
      break;
    case "year":
      sql =
        "SELECT `id_buylist`,DATE_FORMAT(day_buy, '%d/%m/%Y') AS day_buy,DATE_FORMAT(day_admit_staple, '%d/%m/%Y') AS  day_admit_staple,`store`,`cost_price`,`total_cost`,`refer_id`,`note` FROM `buy_staple` WHERE YEAR(`day_buy`) = YEAR(NOW())  ORDER BY `id_buylist` DESC";
      break;
    default:
      sql =
        "SELECT `id_buylist`,DATE_FORMAT(day_buy, '%d/%m/%Y') AS day_buy,DATE_FORMAT(day_admit_staple, '%d/%m/%Y') AS  day_admit_staple,`store`,`cost_price`,`total_cost`,`refer_id`,`note` FROM `buy_staple`  ORDER BY `id_buylist` DESC";
  }

  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
};

// แปุ่มปรับสต๊อกจากมากไปน้อย น้อยไปมาก
export const Report_buy_stable_button_sort = (req, res) => {
  const { column, order } = req.params;
  let sql = "";

  switch (order) {
    case "asc":
      sql = `SELECT id_buylist,DATE_FORMAT(day_buy, '%d/%m/%Y') AS day_buy,DATE_FORMAT(day_admit_staple, '%d/%m/%Y') AS  day_admit_staple,store,cost_price,total_cost,refer_id,note FROM buy_staple  ORDER BY ${column} ASC`;
      break;
    case "desc":
      sql = `SELECT id_buylist,DATE_FORMAT(day_buy, '%d/%m/%Y') AS day_buy,DATE_FORMAT(day_admit_staple, '%d/%m/%Y') AS  day_admit_staple,store,cost_price,total_cost,refer_id,note FROM buy_staple  ORDER BY ${column} DESC`;
      break;
    default:
      sql =
        "SELECT id_buylist,DATE_FORMAT(day_buy, '%d/%m/%Y') AS day_buy,DATE_FORMAT(day_admit_staple, '%d/%m/%Y') AS  day_admit_staple,store,cost_price,total_cost,refer_id,note FROM buy_staple";
  }

  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
};

//สั่งซื้อวัตถุดิบทั้งหมด
export const Report_buy_stable_select_Store = (req, res) => {
  const sql = "SELECT store FROM buy_staple GROUP BY store";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
};

//โชว์ข้อมูลจากที่เลือก
export const Report_buy_stable_select_StoreData = (req, res) => {
  const { teacherName } = req.params;

  const sql =
    "SELECT id_buylist,DATE_FORMAT(day_buy, '%d/%m/%Y') AS day_buy,DATE_FORMAT(day_admit_staple, '%d/%m/%Y') AS  day_admit_staple,store,cost_price,total_cost,refer_id,note FROM buy_staple WHERE store = ?";

  db.query(sql, teacherName, (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
};

// todo2 สิ้นสุดสั่งซื้อวัตถุดิบ --------------------------------------

// todo3  ปรับสต๊อก
// แสดงข้อมูลปรับสต๊อกทั้งหมด
export const Report_cutStock_all = (req, res) => {
  const sql =
    "SELECT cut_stock.id_cutStock , DATE_FORMAT(cut_stock.date_cutStock, '%d/%m/%Y') AS date_cutStock , staple.Name_staple , cut_stock.id_lot , cut_stock.amount_old , cut_stock.amount_total , cut_stock.cause , cut_stock.details_cutStock  , employees.name FROM cut_stock INNER JOIN staple ON cut_stock.id_staple =  staple.id_staple  INNER JOIN lots ON cut_stock.id_lot =  lots.id_lot  INNER JOIN employees ON cut_stock.id_employee =  employees.id_employee ORDER BY cut_stock.id_cutStock DESC";

  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
};

// ปรับสต๊อกตามวันที่
export const Report_cutStock_date = (req, res) => {
  const { start_date, end_date } = req.query;
  const sql =
    "SELECT cut_stock.id_cutStock , DATE_FORMAT(cut_stock.date_cutStock, '%d/%m/%Y') AS date_cutStock , staple.Name_staple , cut_stock.id_lot , cut_stock.amount_old , cut_stock.amount_total , cut_stock.cause , cut_stock.details_cutStock  , employees.name FROM cut_stock INNER JOIN staple ON cut_stock.id_staple =  staple.id_staple  INNER JOIN lots ON cut_stock.id_lot =  lots.id_lot  INNER JOIN employees ON cut_stock.id_employee =  employees.id_employee WHERE date_cutStock BETWEEN ? AND ? ORDER BY date_cutStock ASC";

  db.query(sql, [start_date, end_date], (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
};

// ปุ่มปรับสต๊อกวัน เดือน ปี
export const Report_cutStock_date_button_date = (req, res) => {
  const { view } = req.params;
  let sql = "";

  switch (view) {
    case "week":
      sql =
        "SELECT cut_stock.id_cutStock , DATE_FORMAT(cut_stock.date_cutStock, '%d/%m/%Y') AS date_cutStock , staple.Name_staple , cut_stock.id_lot , cut_stock.amount_old , cut_stock.amount_total , cut_stock.cause , cut_stock.details_cutStock  , employees.name FROM cut_stock INNER JOIN staple ON cut_stock.id_staple =  staple.id_staple  INNER JOIN lots ON cut_stock.id_lot =  lots.id_lot  INNER JOIN employees ON cut_stock.id_employee =  employees.id_employee WHERE WEEK(date_cutStock) = WEEK(NOW()) ORDER BY cut_stock.id_cutStock DESC";
      break;
    case "month":
      sql =
        "SELECT cut_stock.id_cutStock , DATE_FORMAT(cut_stock.date_cutStock, '%d/%m/%Y') AS date_cutStock , staple.Name_staple , cut_stock.id_lot , cut_stock.amount_old , cut_stock.amount_total , cut_stock.cause , cut_stock.details_cutStock  , employees.name FROM cut_stock INNER JOIN staple ON cut_stock.id_staple =  staple.id_staple  INNER JOIN lots ON cut_stock.id_lot =  lots.id_lot  INNER JOIN employees ON cut_stock.id_employee =  employees.id_employee WHERE MONTH(date_cutStock) = MONTH(NOW()) ORDER BY cut_stock.id_cutStock DESC";
      break;
    case "year":
      sql =
        "SELECT cut_stock.id_cutStock , DATE_FORMAT(cut_stock.date_cutStock, '%d/%m/%Y') AS date_cutStock , staple.Name_staple , cut_stock.id_lot , cut_stock.amount_old , cut_stock.amount_total , cut_stock.cause , cut_stock.details_cutStock  , employees.name FROM cut_stock INNER JOIN staple ON cut_stock.id_staple =  staple.id_staple  INNER JOIN lots ON cut_stock.id_lot =  lots.id_lot  INNER JOIN employees ON cut_stock.id_employee =  employees.id_employee WHERE YEAR(date_cutStock) = YEAR(NOW()) ORDER BY cut_stock.id_cutStock DESC";
      break;
    default:
      sql =
        "SELECT cut_stock.id_cutStock , DATE_FORMAT(cut_stock.date_cutStock, '%d/%m/%Y') AS date_cutStock , staple.Name_staple , cut_stock.id_lot , cut_stock.amount_old , cut_stock.amount_total , cut_stock.cause , cut_stock.details_cutStock  , employees.name FROM cut_stock INNER JOIN staple ON cut_stock.id_staple =  staple.id_staple  INNER JOIN lots ON cut_stock.id_lot =  lots.id_lot  INNER JOIN employees ON cut_stock.id_employee =  employees.id_employee ORDER BY cut_stock.id_cutStock DESC";
  }

  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
};

// แปุ่มปรับสต๊อกจากมากไปน้อย น้อยไปมาก
export const Report_cutStock_date_button_sort = (req, res) => {
  const { column, order } = req.params;
  let sql = "";

  switch (order) {
    case "asc":
      sql = `SELECT cut_stock.id_cutStock , DATE_FORMAT(cut_stock.date_cutStock, '%d/%m/%Y') AS date_cutStock , staple.Name_staple , cut_stock.id_lot , cut_stock.amount_old , cut_stock.amount_total , cut_stock.cause , cut_stock.details_cutStock  , employees.name FROM cut_stock INNER JOIN staple ON cut_stock.id_staple =  staple.id_staple  INNER JOIN lots ON cut_stock.id_lot =  lots.id_lot  INNER JOIN employees ON cut_stock.id_employee =  employees.id_employee ORDER BY ${column} ASC`;
      break;
    case "desc":
      sql = `SELECT cut_stock.id_cutStock , DATE_FORMAT(cut_stock.date_cutStock, '%d/%m/%Y') AS date_cutStock , staple.Name_staple , cut_stock.id_lot , cut_stock.amount_old , cut_stock.amount_total , cut_stock.cause , cut_stock.details_cutStock  , employees.name FROM cut_stock INNER JOIN staple ON cut_stock.id_staple =  staple.id_staple  INNER JOIN lots ON cut_stock.id_lot =  lots.id_lot  INNER JOIN employees ON cut_stock.id_employee =  employees.id_employee ORDER BY ${column} DESC`;
      break;
    default:
      sql =
        "SELECT cut_stock.id_cutStock , DATE_FORMAT(cut_stock.date_cutStock, '%d/%m/%Y') AS date_cutStock , staple.Name_staple , cut_stock.id_lot , cut_stock.amount_old , cut_stock.amount_total , cut_stock.cause , cut_stock.details_cutStock  , employees.name FROM cut_stock INNER JOIN staple ON cut_stock.id_staple =  staple.id_staple  INNER JOIN lots ON cut_stock.id_lot =  lots.id_lot  INNER JOIN employees ON cut_stock.id_employee =  employees.id_employee ";
  }

  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
};

// todo3  สิ้นสุดปรับสต๊อก --------------------------------------

// todo 4 การสร้างสูตร

// อ่านข้อมูลสูตรผลิต
export const Report_unit_all = (req, res) => {
  const sql =
    "SELECT unit.id_unit,unit.unit_name,DATE_FORMAT(unit.day_admit_list, '%d/%m/%Y') AS day_admit_list,unit.notification_num, DATE_FORMAT(unit.date_notification_num, '%d/%m/%Y') AS date_notification_num,customer.name_cus,employees.name FROM `unit` INNER JOIN customer ON unit.id_customer = customer.id_customer INNER JOIN employees ON unit.id_employee = employees.id_employee ORDER BY unit.id_unit DESC";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
};

//สั่งซื้อวัตถุดิบ ค้นหาตามวันที่เริ่มต้น - สิ้นสุด
export const Report_unit_date = (req, res) => {
  const { start_date, end_date } = req.query;
  const sql =
    "SELECT unit.id_unit,unit.unit_name,DATE_FORMAT(unit.day_admit_list, '%d/%m/%Y') AS day_admit_list,unit.notification_num, DATE_FORMAT(unit.date_notification_num, '%d/%m/%Y') AS date_notification_num,customer.name_cus,employees.name FROM `unit` INNER JOIN customer ON unit.id_customer = customer.id_customer INNER JOIN employees ON unit.id_employee = employees.id_employee WHERE day_admit_list BETWEEN ? AND ? ORDER BY day_admit_list DESC";
  db.query(sql, [start_date, end_date], (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
};

//สั่งซื้อวัตถุดิบ  ปุ่มกด วันเดือนปี
export const Report_unit_button_date = (req, res) => {
  const { view } = req.params;
  let sql = "";

  switch (view) {
    case "เลือกช่วงวันที่":
      sql =
        "SELECT unit.id_unit,unit.unit_name,DATE_FORMAT(unit.day_admit_list, '%d/%m/%Y') AS day_admit_list,unit.notification_num, DATE_FORMAT(unit.date_notification_num, '%d/%m/%Y') AS date_notification_num,customer.name_cus,employees.name FROM `unit` INNER JOIN customer ON unit.id_customer = customer.id_customer INNER JOIN employees ON unit.id_employee = employees.id_employee ORDER BY unit.id_unit DESC";
      break;
    case "week":
      sql =
        "SELECT unit.id_unit,unit.unit_name,DATE_FORMAT(unit.day_admit_list, '%d/%m/%Y') AS day_admit_list,unit.notification_num, DATE_FORMAT(unit.date_notification_num, '%d/%m/%Y') AS date_notification_num,customer.name_cus,employees.name FROM `unit` INNER JOIN customer ON unit.id_customer = customer.id_customer INNER JOIN employees ON unit.id_employee = employees.id_employee WHERE WEEK(`day_admit_list`) = WEEK(NOW()) ORDER BY day_admit_list DESC";
      break;
    case "month":
      sql =
        "SELECT unit.id_unit,unit.unit_name,DATE_FORMAT(unit.day_admit_list, '%d/%m/%Y') AS day_admit_list,unit.notification_num, DATE_FORMAT(unit.date_notification_num, '%d/%m/%Y') AS date_notification_num,customer.name_cus,employees.name FROM `unit` INNER JOIN customer ON unit.id_customer = customer.id_customer INNER JOIN employees ON unit.id_employee = employees.id_employee WHERE MONTH(`day_admit_list`) = MONTH(NOW()) ORDER BY day_admit_list DESC";
      break;
    case "year":
      sql =
        "SELECT unit.id_unit,unit.unit_name,DATE_FORMAT(unit.day_admit_list, '%d/%m/%Y') AS day_admit_list,unit.notification_num, DATE_FORMAT(unit.date_notification_num, '%d/%m/%Y') AS date_notification_num,customer.name_cus,employees.name FROM `unit` INNER JOIN customer ON unit.id_customer = customer.id_customer INNER JOIN employees ON unit.id_employee = employees.id_employee WHERE YEAR(`day_admit_list`) = YEAR(NOW()) ORDER BY day_admit_list DESC";

      break;
    default:
      sql =
        "SELECT unit.id_unit,unit.unit_name,DATE_FORMAT(unit.day_admit_list, '%d/%m/%Y') AS day_admit_list,unit.notification_num, DATE_FORMAT(unit.date_notification_num, '%d/%m/%Y') AS date_notification_num,customer.name_cus,employees.name FROM `unit` INNER JOIN customer ON unit.id_customer = customer.id_customer INNER JOIN employees ON unit.id_employee = employees.id_employee ORDER BY unit.id_unit DESC";
  }

  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
};

// แปุ่มปรับสต๊อกจากมากไปน้อย น้อยไปมาก
export const Report_unit_button_sort = (req, res) => {
  const { column, order } = req.params;
  let sql = "";

  switch (order) {
    case "asc":
      sql = `SELECT unit.id_unit,unit.unit_name,DATE_FORMAT(unit.day_admit_list, '%d/%m/%Y') AS day_admit_list,unit.notification_num, DATE_FORMAT(unit.date_notification_num, '%d/%m/%Y') AS date_notification_num,customer.name_cus,employees.name FROM unit INNER JOIN customer ON unit.id_customer = customer.id_customer INNER JOIN employees ON unit.id_employee = employees.id_employee ORDER BY ${column} ASC`;
      break;
    case "desc":
      sql = `SELECT unit.id_unit,unit.unit_name,DATE_FORMAT(unit.day_admit_list, '%d/%m/%Y') AS day_admit_list,unit.notification_num, DATE_FORMAT(unit.date_notification_num, '%d/%m/%Y') AS date_notification_num,customer.name_cus,employees.name FROM unit INNER JOIN customer ON unit.id_customer = customer.id_customer INNER JOIN employees ON unit.id_employee = employees.id_employee ORDER BY ${column} DESC`;
      break;
    default:
      sql =
        "SELECT unit.id_unit,unit.unit_name,DATE_FORMAT(unit.day_admit_list, '%d/%m/%Y') AS day_admit_list,unit.notification_num, DATE_FORMAT(unit.date_notification_num, '%d/%m/%Y') AS date_notification_num,customer.name_cus,employees.name FROM `unit` INNER JOIN customer ON unit.id_customer = customer.id_customer INNER JOIN employees ON unit.id_employee = employees.id_employee";
  }

  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
};

//สั่งซื้อวัตถุดิบทั้งหมด
export const Report_unit_select_customer = (req, res) => {
  const sql =
    "SELECT customer.name_cus FROM `unit` INNER JOIN customer ON unit.id_customer = customer.id_customer GROUP BY customer.id_customer";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
};

//โชว์ข้อมูลจากที่เลือก
export const Report_unit_select_customerData = (req, res) => {
  const { teacherName } = req.params;

  const sql =
    "SELECT unit.id_unit,unit.unit_name,DATE_FORMAT(unit.day_admit_list, '%d/%m/%Y') AS day_admit_list,unit.notification_num, DATE_FORMAT(unit.date_notification_num, '%d/%m/%Y') AS date_notification_num,customer.name_cus,employees.name FROM `unit` INNER JOIN customer ON unit.id_customer = customer.id_customer INNER JOIN employees ON unit.id_employee = employees.id_employee WHERE customer.name_cus = ?";

  db.query(sql, teacherName, (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
};

// todo 4 การสร้างสูตร ---------------------------------------------

// todo 5 การสั่งผลิต

// อ่านข้อมูลสูตรผลิต
export const Report_product_all = (req, res) => {
  const sql =
    "SELECT unit.id_unit,unit.unit_name,DATE_FORMAT(unit.day_admit_list, '%d/%m/%Y') AS day_admit_list,unit.notification_num, DATE_FORMAT(unit.date_notification_num, '%d/%m/%Y') AS date_notification_num,customer.name_cus,employees.name FROM `unit` INNER JOIN customer ON unit.id_customer = customer.id_customer INNER JOIN employees ON unit.id_employee = employees.id_employee ORDER BY unit.id_unit DESC";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
};

//สั่งซื้อวัตถุดิบ ค้นหาตามวันที่เริ่มต้น - สิ้นสุด
export const Report_product_date = (req, res) => {
  const { start_date, end_date } = req.query;
  const sql =
    "SELECT unit.id_unit,unit.unit_name,DATE_FORMAT(unit.day_admit_list, '%d/%m/%Y') AS day_admit_list,unit.notification_num, DATE_FORMAT(unit.date_notification_num, '%d/%m/%Y') AS date_notification_num,customer.name_cus,employees.name FROM `unit` INNER JOIN customer ON unit.id_customer = customer.id_customer INNER JOIN employees ON unit.id_employee = employees.id_employee WHERE day_admit_list BETWEEN ? AND ? ORDER BY day_admit_list DESC";
  db.query(sql, [start_date, end_date], (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
};

//สั่งซื้อวัตถุดิบ  ปุ่มกด วันเดือนปี
export const Report_product_button_date = (req, res) => {
  const { view } = req.params;
  let sql = "";

  switch (view) {
    case "เลือกช่วงวันที่":
      sql =
        "SELECT unit.id_unit,unit.unit_name,DATE_FORMAT(unit.day_admit_list, '%d/%m/%Y') AS day_admit_list,unit.notification_num, DATE_FORMAT(unit.date_notification_num, '%d/%m/%Y') AS date_notification_num,customer.name_cus,employees.name FROM `unit` INNER JOIN customer ON unit.id_customer = customer.id_customer INNER JOIN employees ON unit.id_employee = employees.id_employee ORDER BY unit.id_unit DESC";
      break;
    case "week":
      sql =
        "SELECT unit.id_unit,unit.unit_name,DATE_FORMAT(unit.day_admit_list, '%d/%m/%Y') AS day_admit_list,unit.notification_num, DATE_FORMAT(unit.date_notification_num, '%d/%m/%Y') AS date_notification_num,customer.name_cus,employees.name FROM `unit` INNER JOIN customer ON unit.id_customer = customer.id_customer INNER JOIN employees ON unit.id_employee = employees.id_employee WHERE WEEK(`day_admit_list`) = WEEK(NOW()) ORDER BY day_admit_list DESC";
      break;
    case "month":
      sql =
        "SELECT unit.id_unit,unit.unit_name,DATE_FORMAT(unit.day_admit_list, '%d/%m/%Y') AS day_admit_list,unit.notification_num, DATE_FORMAT(unit.date_notification_num, '%d/%m/%Y') AS date_notification_num,customer.name_cus,employees.name FROM `unit` INNER JOIN customer ON unit.id_customer = customer.id_customer INNER JOIN employees ON unit.id_employee = employees.id_employee WHERE MONTH(`day_admit_list`) = MONTH(NOW()) ORDER BY day_admit_list DESC";
      break;
    case "year":
      sql =
        "SELECT unit.id_unit,unit.unit_name,DATE_FORMAT(unit.day_admit_list, '%d/%m/%Y') AS day_admit_list,unit.notification_num, DATE_FORMAT(unit.date_notification_num, '%d/%m/%Y') AS date_notification_num,customer.name_cus,employees.name FROM `unit` INNER JOIN customer ON unit.id_customer = customer.id_customer INNER JOIN employees ON unit.id_employee = employees.id_employee WHERE YEAR(`day_admit_list`) = YEAR(NOW()) ORDER BY day_admit_list DESC";

      break;
    default:
      sql =
        "SELECT unit.id_unit,unit.unit_name,DATE_FORMAT(unit.day_admit_list, '%d/%m/%Y') AS day_admit_list,unit.notification_num, DATE_FORMAT(unit.date_notification_num, '%d/%m/%Y') AS date_notification_num,customer.name_cus,employees.name FROM `unit` INNER JOIN customer ON unit.id_customer = customer.id_customer INNER JOIN employees ON unit.id_employee = employees.id_employee ORDER BY unit.id_unit DESC";
  }

  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
};

// แปุ่มปรับสต๊อกจากมากไปน้อย น้อยไปมาก
export const Report_product_button_sort = (req, res) => {
  const { column, order } = req.params;
  let sql = "";

  switch (order) {
    case "asc":
      sql = `SELECT unit.id_unit,unit.unit_name,DATE_FORMAT(unit.day_admit_list, '%d/%m/%Y') AS day_admit_list,unit.notification_num, DATE_FORMAT(unit.date_notification_num, '%d/%m/%Y') AS date_notification_num,customer.name_cus,employees.name FROM unit INNER JOIN customer ON unit.id_customer = customer.id_customer INNER JOIN employees ON unit.id_employee = employees.id_employee ORDER BY ${column} ASC`;
      break;
    case "desc":
      sql = `SELECT unit.id_unit,unit.unit_name,DATE_FORMAT(unit.day_admit_list, '%d/%m/%Y') AS day_admit_list,unit.notification_num, DATE_FORMAT(unit.date_notification_num, '%d/%m/%Y') AS date_notification_num,customer.name_cus,employees.name FROM unit INNER JOIN customer ON unit.id_customer = customer.id_customer INNER JOIN employees ON unit.id_employee = employees.id_employee ORDER BY ${column} DESC`;
      break;
    default:
      sql =
        "SELECT unit.id_unit,unit.unit_name,DATE_FORMAT(unit.day_admit_list, '%d/%m/%Y') AS day_admit_list,unit.notification_num, DATE_FORMAT(unit.date_notification_num, '%d/%m/%Y') AS date_notification_num,customer.name_cus,employees.name FROM `unit` INNER JOIN customer ON unit.id_customer = customer.id_customer INNER JOIN employees ON unit.id_employee = employees.id_employee";
  }

  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
};

//สั่งซื้อวัตถุดิบทั้งหมด
export const Report_product_select_customer = (req, res) => {
  const sql =
    "SELECT customer.name_cus FROM `unit` INNER JOIN customer ON unit.id_customer = customer.id_customer ";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
};

//โชว์ข้อมูลจากที่เลือก
export const Report_product_select_customerData = (req, res) => {
  const { teacherName } = req.params;

  const sql =
    "SELECT unit.id_unit,unit.unit_name,DATE_FORMAT(unit.day_admit_list, '%d/%m/%Y') AS day_admit_list,unit.notification_num, DATE_FORMAT(unit.date_notification_num, '%d/%m/%Y') AS date_notification_num,customer.name_cus,employees.name FROM `unit` INNER JOIN customer ON unit.id_customer = customer.id_customer INNER JOIN employees ON unit.id_employee = employees.id_employee WHERE customer.name_cus = ?";

  db.query(sql, teacherName, (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
};

// todo 5 การสั่งผลิต ---------------------------------------------
