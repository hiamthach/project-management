import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';

import { useLocation } from 'react-router-dom';

// //Import Scrollbar
import SimpleBar from 'simplebar-react';

// MetisMenu
import MetisMenu from 'metismenujs';
import { Link } from 'react-router-dom';

//i18n
import { withTranslation } from 'react-i18next';

const SidebarContent = (props) => {
  const ref = useRef();

  const { pathname } = useLocation();
  console.log(pathname);
  useEffect(() => {
    const initMenu = () => {
      new MetisMenu('#side-menu');
      let matchingMenuItem = null;
      const ul = document.getElementById('side-menu');
      const items = ul.getElementsByTagName('a');
      for (let i = 0; i < items.length; ++i) {
        if (pathname !== '/' && pathname.includes(items[i].pathname)) {
          matchingMenuItem = items[i];
          break;
        }
      }
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem);
      }
    };
    initMenu();
  }, [pathname]);

  useEffect(() => {
    ref.current.recalculate();
  });

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop;
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300;
      }
    }
  }

  function activateParentDropdown(item) {
    item.classList.add('active');
    const parent = item.parentElement;
    const parent2El = parent.childNodes[1];
    if (parent2El && parent2El.id !== 'side-menu') {
      parent2El.classList.add('mm-show');
    }

    if (parent) {
      parent.classList.add('mm-active');
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add('mm-show'); // ul tag

        const parent3 = parent2.parentElement; // li tag

        if (parent3) {
          parent3.classList.add('mm-active'); // li
          parent3.childNodes[0].classList.add('mm-active'); //a
          const parent4 = parent3.parentElement; // ul
          if (parent4) {
            parent4.classList.add('mm-show'); // ul
            const parent5 = parent4.parentElement;
            if (parent5) {
              parent5.classList.add('mm-show'); // li
              parent5.childNodes[0].classList.add('mm-active'); // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false;
    }
    scrollElement(item);
    return false;
  }

  return (
    <SimpleBar className="h-100" ref={ref}>
      <div id="sidebar-menu">
        <ul className="metismenu list-unstyled" id="side-menu">
          <li>
            <Link to="/" className={`${pathname === '/' ? 'mm-active' : ''}`}>
              <i className="bx bx-home-circle"></i>
              <span>{props.t('Dashboards')}</span>
            </Link>
          </li>

          <li className="menu-title">{props.t('Apps')}</li>

          <li className={`${pathname.includes('calendar') ? 'mm-active' : ''}`}>
            <Link to="calendar">
              <i className="bx bx-calendar"></i>
              <span>{props.t('Calendar')}</span>
            </Link>
          </li>

          <li className={`${pathname.includes('projects') ? 'mm-active' : ''}`}>
            <Link to="projects">
              <i className="bx bx-briefcase-alt-2"></i>
              <span>{props.t('Projects')}</span>
            </Link>
          </li>

          <li className={`${pathname.includes('tasks') ? 'mm-active' : ''}`}>
            <Link to="tasks">
              <i className="bx bx-task"></i>
              <span>{props.t('Tasks')}</span>
            </Link>
          </li>
        </ul>
      </div>
    </SimpleBar>
  );
};

SidebarContent.propTypes = {
  t: PropTypes.any,
};

export default withTranslation()(SidebarContent);
