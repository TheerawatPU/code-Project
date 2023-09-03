import React from "react";
import Topnav from "../../../component/Topnav";
import Menu from "../../../component/Menu";
import "../../../CSS/Stable.css";
function LotNew() {
  return (
    <div className="all-page-new">
      <header className="header-new">
        <Topnav />
      </header>
      <section className="aside-new">
        <Menu />
      </section>
      <main className="main-new">
        <div className="top-text-new">
          <div className="text-new">เพิ่มข้อมูลล็อต</div>
          <button className="button-new">เพิ่มล็อต</button>
        </div>

        {/* <div className="text-new-lg">กรุณากรอกข้อมูลให้ครบทุกช่อง</div> */}
        <div className="box-big-bg-new">
          <div className="box-BG-area-new">
            <form className="form-customer">
              <div className="form-row">
                <label className="form-label-new">
                  <p>*</p>วันหมดอายุ :
                </label>
                <input type="date" className="form-input-new" />
              </div>
              <div className="form-row-new">
                <label className="form-label-new">
                  <p>*</p>ราคา :
                </label>
                <input type="text" className="form-input-new" />
              </div>
              <div className="form-row-new">
                <label className="form-label-new">
                  <p>*</p>ปริมาณ :
                </label>
                <input type="text" className="form-input-new" />
              </div>
              <div className="form-row-new">
                <label className="form-label-new">
                  <p>*</p>COA :
                </label>
                <input
                  type="text"
                  className="form-input-new"
                  placeholder="เพิ่มไฟล์ COA"
                />
              </div>

              <div className="form-row-new">
                <label className="form-label-new">
                  <p>*</p>MSDS :
                </label>
                <input
                  type="text"
                  className="form-input-new"
                  placeholder="เพิ่มไฟล์ MSDS"
                />
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default LotNew;
