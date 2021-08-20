import {
  makeStyles,
} from '@material-ui/core';
import React from 'react';


const useStyles = makeStyles(() => ({
  body: {
    height: '100vh',
    width: '100vw',
  }
}));

function Homepage() {
  const classes = useStyles();

  return (
    <>
      <ol>
        <li>
          <a href='/Conways_Game_Of_Life'>
            {'بازی زندگی کانوی (سیستم‌های پیچیده)'}
          </a>
        </li>
        <li>
          <a href='/Collective_Behavior_Of_Fish'>
            {'رفتار جمعی ماهی‌ها (سیستم‌های پیچیده)'}
          </a>
        </li>
        <li>
          <a href='/Ant_Colony_Optimization'>
            {'بهینه‌سازی مورچه‌ها (سیستم‌های پیچیده)'}
          </a>
        </li>
        <li>
          <a href='/Game_Of_Life_Simulation'>
            {'شبیه‌ساز بازی زندگی (سیستم‌های پیچیده)'}
          </a>
        </li>
        <li>
          <a href='/Network_Vaccination'>
            {'واکسیناسیون شبکه (سیستم‌های پیچیده)'}
          </a>
        </li>
        <li>
          <a href='/Tarkibiat/1'>
            {'تطابق ۱ (ترکیبیات)'}
          </a>
        </li>
        <li>
          <a href='/Tarkibiat/2'>
            {'تطابق ۲ (ترکیبیات)'}
          </a>
        </li>
        <li>
          <a href='/Tarkibiat/3'>
            {'تطابق ۳ (ترکیبیات)'}
          </a>
        </li>
        <li>
          <a href='/Account2Points'>
            {'حساب به نقطه‌ها (سیستم‌های پیشنهاد‌دهنده)'}
          </a>
        </li>
        <li>
          <a href='/Donor_Patient/1'>
            {'اهداکنندگان و بیماران ۱ (نظریه بازی)'}
          </a>
        </li>
        <li>
          <a href='/Donor_Patient/2'>
            {'اهداکنندگان و بیماران ۲ (نظریه بازی)'}
          </a>
        </li>
        <li>
          <a href='/Donor_Patient/3'>
            {'اهداکنندگان و بیماران ۳ (نظریه بازی)'}
          </a>
        </li>
        <li>
          <a href='/Donor_Patient/4'>
            {'اهداکنندگان و بیماران ۴ (نظریه بازی)'}
          </a>
        </li>
        <li>
          <a href='/Defusing_Bomb'>
            {'ماشین زمان (اتوماتا)'}
          </a>
        </li>
      </ol>
    </>
  );
}

export default Homepage;
