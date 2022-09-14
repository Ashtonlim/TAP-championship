import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Switch } from 'antd'

import { APPNAME } from '../../../const'

const Header = () => {
  const toggleDarkModeStyle = (darkMode) => {
    if (darkMode) {
      const style = document.createElement('style')
      style.setAttribute('class', 'customDarkMode')
      style.innerHTML = `html, img, footer, .eDM {filter: invert(1) hue-rotate(180deg);} 
      .App-header, 
      .card, 
      .augDM, 
      .ant-modal-root div.ant-modal-content-rmtoallow {background-color: #ddd; box-shadow: none;}
      .augDMNoBg {box-shadow: none} .augDMNoBg:focus {box-shadow: none;}`
      document.head.appendChild(style)
    } else {
      const l = document.querySelectorAll('.customDarkMode')
      for (var i = 0; i < l.length; i++) {
        l[i].remove()
      }
    }
  }

  return (
    <header className="App-header bg-white">
      <Row
        style={{ width: '100%', padding: '0px 20px' }}
        justify="center"
        align="middle"
      >
        <Col xs={{ span: 0 }} lg={{ span: 3 }}>
          <Link id="logo" to="/">
            {APPNAME}
          </Link>
        </Col>

        <Col xs={{ span: 24 }} md={{ span: 10 }} lg={{ span: 8 }}></Col>

        <Col xs={{ span: 0 }} md={{ span: 14 }} lg={{ span: 13 }}>
          <nav style={{ justifyContent: 'flex-end' }}>
            <ul className="ruRow nav-items">
              <Switch checkedChildren="Dark" unCheckedChildren="Light" />

              <li className="nav-item">
                <Link to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/register">register teams</Link>
              </li>
            </ul>
          </nav>
        </Col>
      </Row>
    </header>
  )
}

export default Header
