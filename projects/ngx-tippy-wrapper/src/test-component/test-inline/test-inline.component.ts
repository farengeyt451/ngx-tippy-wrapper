import { Component } from '@angular/core';

@Component({
  selector: 'tippy-test-inline',
  template: `
    <div class="test-inline">
      <button
        class="test-inline__btn"
        ngxTippy
        data-tippy-content="Tooltip content from data attribute"
        data-tippy-duration="500"
        tippyName="unit-test"
        [tippyProps]="{
          appendTo: 'parent',
          arrow: false
        }"
      >
        Element with tooltip
      </button>
    </div>
  `,

  styles: [
    `
      .test-inline {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 120px;
        padding: 40px;
        background-color: #f9f8f5;
        font-family: 'Open Sans', sans-serif;
      }

      .test-inline__btn {
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        background-image: linear-gradient(120deg, #54d182 0%, #3db9f5 100%);
        color: #fff;
        font-weight: 600;
        font-size: 14px;
        font-family: 'Open Sans', sans-serif;
        cursor: pointer;
      }
    `,
  ],
})
export class TestInlineComponent {}
