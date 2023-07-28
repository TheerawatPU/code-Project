import React, { children } from "react";
import { FaTh, FaBars, FaBox, FaBoxes } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { BsBoxSeam } from "react-icons/bs";
import { GiBackwardTime } from "react-icons/gi";
import "../CSS/Component.css"

function Menu({ children }) {
  const menuItem = [
    {
      path: "/Unit",
      name: "สูตรผลิต",
      icon: <BsBoxSeam />,
    },
    {
      path: "/StablePage",
      name: "วัตถุดิบ",
      icon: <FaBoxes />,
    },
    {
      path: "/CustomerReadPage",
      name: "ลูกค้า",
      icon: <BsBoxSeam />,
    },
    {
      path: "/Report",
      name: "รีพอร์ต",
      icon: <GiBackwardTime />,
    },
  ];

  return (
    <div className="container">
      <div class="sidebar">
        <div className="top_section">
          <h1 className="logo">Food4skin</h1>
          <h4 className="Thailand">Thailand</h4>
        </div>
        <nav class="sidebar-menu">
          <ul>
            {menuItem.map((item, index) => (
              <NavLink
                to={item.path}
                key={index}
                className="link"
                activeclassName="active"
              >
                <div className="icon">{item.icon}</div>
                <div className="link_text">{item.name}</div>
              </NavLink>
            ))}
          </ul>
        </nav>
      </div>

      <div class="content">
        <main>{children}</main>
      </div>
    </div>
  );
}

export default Menu;
