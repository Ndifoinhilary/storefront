import { checkIsAuthenticated } from '../../scripts/configs.js';
import { rootLink } from '../../scripts/scripts.js';
import { CUSTOMER_LOGIN_PATH } from '../../scripts/constants.js';

export default function decorate(block) {
  // Redirect to login if not authenticated
  if (!checkIsAuthenticated()) {
    window.location.href = rootLink(CUSTOMER_LOGIN_PATH);
    return;
  }

  // Example: dummy data
  const incomes = [
    { source: 'Freelancing', amount: '$1200', date: '2025-05-01' },
    { source: 'App Sales', amount: '$800', date: '2025-05-03' },
    { source: 'Consulting', amount: '$500', date: '2025-05-05' },
  ];

  // Create a list to display incomes
  const ul = document.createElement('ul');
  ul.classList.add('income-list');

  incomes.forEach(({ source, amount, date }) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${source}</strong><br>
      Amount: ${amount}<br>
      Date: ${date}
    `;
    ul.appendChild(li);
  });

  block.textContent = '';
  block.appendChild(ul);
}
