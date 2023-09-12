import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgxTippyService } from 'ngx-tippy-wrapper';
const emojis = [
  '😄',
  '😃',
  '😀',
  '😊',
  '😉',
  '😍',
  '😘',
  '😚',
  '😗',
  '😙',
  '😜',
  '😝',
  '😛',
  '😳',
  '😁',
  '😔',
  '😌',
  '😒',
  '😞',
  '😣',
  '😢',
  '😂',
  '😭',
  '😪',
  '😥',
  '😰',
  '😅',
  '😓',
  '😩',
  '😫',
  '😨',
  '😱',
  '😠',
  '😡',
  '😤',
  '😖',
  '😆',
  '😋',
  '😷',
  '😎',
  '😴',
  '😵',
  '😲',
  '😟',
  '😦',
  '😧',
  '😈',
  '👿',
  '😮',
  '😬',
  '😐',
  '😕',
  '😯',
  '😶',
  '😇',
  '😏',
];

@Component({
  selector: 'app-demo-page',
  templateUrl: './demo-page.component.html',
  styleUrls: ['./demo-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoPageComponent implements OnInit {
  public readonly tooltips = {
    'top': {
      item: 'top',
      content: emojis[Math.floor(Math.random() * emojis.length)],
    },
    'top-start': {
      item: 'top-start',
      content: emojis[Math.floor(Math.random() * emojis.length)],
    },
    'top-end': {
      item: 'top-end',
      content: emojis[Math.floor(Math.random() * emojis.length)],
    },
    'right': {
      item: 'right',
      content: emojis[Math.floor(Math.random() * emojis.length)],
    },
    'right-start': {
      item: 'right-start',
      content: emojis[Math.floor(Math.random() * emojis.length)],
    },
    'right-end': {
      item: 'right-end',
      content: emojis[Math.floor(Math.random() * emojis.length)],
    },
    'bottom': {
      item: 'bottom',
      content: emojis[Math.floor(Math.random() * emojis.length)],
    },
    'bottom-start': {
      item: 'bottom-start',
      content: emojis[Math.floor(Math.random() * emojis.length)],
    },
    'bottom-end': {
      item: 'bottom-end',
      content: emojis[Math.floor(Math.random() * emojis.length)],
    },
    'left': {
      item: 'left',
      content: emojis[Math.floor(Math.random() * emojis.length)],
    },
    'left-start': {
      item: 'left-start',
      content: emojis[Math.floor(Math.random() * emojis.length)],
    },
    'left-end': {
      item: 'left-end',
      content: emojis[Math.floor(Math.random() * emojis.length)],
    },
  };

  public readonly animations = {
    'shift-away': {
      item: 'shift-away',
      content: emojis[Math.floor(Math.random() * emojis.length)],
    },
    'shift-away-subtle': {
      item: 'shift-away-subtle',
      content: emojis[Math.floor(Math.random() * emojis.length)],
    },
    'shift-away-extreme': {
      item: 'shift-away-extreme',
      content: emojis[Math.floor(Math.random() * emojis.length)],
    },
    'shift-toward': {
      item: 'shift-toward',
      content: emojis[Math.floor(Math.random() * emojis.length)],
    },
    'shift-toward-subtle': {
      item: 'shift-toward-subtle',
      content: emojis[Math.floor(Math.random() * emojis.length)],
    },
    'shift-toward-extreme': {
      item: 'shift-toward-extreme',
      content: emojis[Math.floor(Math.random() * emojis.length)],
    },
    'scale': {
      item: 'scale',
      content: emojis[Math.floor(Math.random() * emojis.length)],
    },
    'scale-subtle': {
      item: 'scale-subtle',
      content: emojis[Math.floor(Math.random() * emojis.length)],
    },
    'scale-extreme': {
      item: 'scale-extreme',
      content: emojis[Math.floor(Math.random() * emojis.length)],
    },
    'perspective': {
      item: 'perspective',
      content: emojis[Math.floor(Math.random() * emojis.length)],
    },
    'perspective-subtle': {
      item: 'perspective-subtle',
      content: emojis[Math.floor(Math.random() * emojis.length)],
    },
    'perspective-extreme': {
      item: 'perspective-extreme',
      content: emojis[Math.floor(Math.random() * emojis.length)],
    },
  };

  constructor(private readonly tippyService: NgxTippyService) {}

  ngOnInit(): void {}

  showManualTooltip() {
    this.tippyService.show('feistyFawn');
  }
}
