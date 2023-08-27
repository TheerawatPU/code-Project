import React from "react";
import MenuAD from "./ComponentAD/MenuAD";
import TopNavAD from "./ComponentAD/TopNavAD";
import "./CSS/ComponentAD.css";

function StockReadPage() {
  return (
    <div className="all-page">
      <header className="header">
        <TopNavAD />
      </header>
      <section className="aside">
        <MenuAD />
      </section>

      <main className="main">
        <h1>StockReadPage</h1>
      </main>
    </div>
  );
}

export default StockReadPage;
