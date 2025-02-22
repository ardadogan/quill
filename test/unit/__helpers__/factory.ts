import { Registry } from 'parchment';

import Block from '../../../blots/block';
import Break from '../../../blots/break';
import Cursor from '../../../blots/cursor';
import Scroll from '../../../blots/scroll';
import TextBlot from '../../../blots/text';
import ListItem, { ListContainer } from '../../../formats/list';
import Inline from '../../../blots/inline';
import Emitter from '../../../core/emitter';
import { normalizeHTML } from './utils';

export const createRegistry = (formats: unknown[] = []) => {
  const registry = new Registry();

  formats.forEach(format => {
    registry.register(format);
  });
  registry.register(Block);
  registry.register(Break);
  registry.register(Cursor);
  registry.register(Inline);
  registry.register(Scroll);
  registry.register(TextBlot);
  registry.register(ListContainer);
  registry.register(ListItem);

  return registry;
};

export const createScroll = (
  html: string | { html: string },
  registry = createRegistry(),
  container = document.body,
) => {
  const emitter = new Emitter();
  const root = container.appendChild(document.createElement('div'));
  root.innerHTML = normalizeHTML(html);
  const scroll = new Scroll(registry, root, {
    emitter,
  });
  return scroll;
};
