import { createOptimizedPicture } from '../../scripts/aem.js';

/**
 * Decorates a block by transforming it into a list of styled cards
 * @param {HTMLElement} block - The block element to decorate
 */
export default function decorate(block) {
  // Create a new <ul> element to hold the cards
  const ul = document.createElement('ul');

  // Loop through each "row" in the block (each child is a potential card)
  [...block.children].forEach((row) => {
    const li = document.createElement('li');

    // Move all child elements of the row into the li
    while (row.firstElementChild) {
      li.append(row.firstElementChild);
    }

    // Loop through each <div> inside the li and assign classes
    [...li.children].forEach((div) => {
      const hasOnePicture = div.children.length === 1 && div.querySelector('picture');
      div.className = hasOnePicture ? 'cards-card-image' : 'cards-card-body';
    });

    ul.append(li); // Add the li to the ul
  });

  // Optimize all images inside the new ul
  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimized = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    img.closest('picture').replaceWith(optimized);
  });

  // Replace the original block content with the newly constructed ul
  block.textContent = '';
  block.append(ul);
}
