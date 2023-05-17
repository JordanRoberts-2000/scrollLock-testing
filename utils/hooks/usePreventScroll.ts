import { useLayoutEffect } from "react";

// @ts-ignore
const visualViewport = typeof window !== 'undefined' && window.visualViewport;

// HTML input types that do not cause the software keyboard to appear.
const nonTextInputTypes = new Set([
  'checkbox',
  'radio',
  'range',
  'color',
  'file',
  'image',
  'button',
  'submit',
  'reset'
]);

const isIOS = () => {return false}
// The number of active usePreventScroll calls. Used to determine whether to revert back to the original page style/scroll position
let preventScrollCount = 0;

/**
 * Prevents scrolling on the document body on mount, and
 * restores it on unmount. Also ensures that content does not
 * shift due to the scrollbars disappearing.
 */
export const usePreventScroll = (disabled?: boolean) => {
  useLayoutEffect(() => {
    console.log('bodyLocked ')
    if (disabled) {
      return;
    }

    preventScrollCount++;
    if (preventScrollCount === 1) {
      if (isIOS()) {
        return
      } else {
        document.documentElement.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}`
        document.documentElement.style.overflow = 'hidden'
        preventScrollMobileSafari()
      }
    }

    return () => {
      preventScrollCount--;
      if (preventScrollCount === 0) {
        document.documentElement.style.paddingRight = `0px`
        document.documentElement.style.overflow = 'auto'
      }
    };
  }, [disabled]);
}

// Mobile Safari is a whole different beast. Even with overflow: hidden,
// it still scrolls the page in many situations:
//
// 1. When the bottom toolbar and address bar are collapsed, page scrolling is always allowed.
// 2. When the keyboard is visible, the viewport does not resize. Instead, the keyboard covers part of
//    it, so it becomes scrollable.
// 3. When tapping on an input, the page always scrolls so that the input is centered in the visual viewport.
//    This may cause even fixed position elements to scroll off the screen.
// 4. When using the next/previous buttons in the keyboard to navigate between inputs, the whole page always
//    scrolls, even if the input is inside a nested scrollable element that could be scrolled instead.
//
// In order to work around these cases, and prevent scrolling without jankiness, we do a few things:
//
// 1. Prevent default on `touchmove` events that are not in a scrollable element. This prevents touch scrolling
//    on the window.
// 2. Prevent default on `touchmove` events inside a scrollable element when the scroll position is at the
//    top or bottom. This avoids the whole page scrolling instead, but does prevent overscrolling.
// 3. Prevent default on `touchend` events on input elements and handle focusing the element ourselves.
// 4. When focusing an input, apply a transform to trick Safari into thinking the input is at the top
//    of the page, which prevents it from scrolling the page. After the input is focused, scroll the element
//    into view ourselves, without scrolling the whole page.
// 5. Offset the body by the scroll position using a negative margin and scroll to the top. This should appear the
//    same visually, but makes the actual scroll position always zero. This is required to make all of the
//    above work or Safari will still try to scroll the page when focusing an input.
// 6. As a last resort, handle window scroll events, and scroll back to the top. This can happen when attempting
//    to navigate to an input with the next/previous buttons that's outside a modal.
function preventScrollMobileSafari() {
    let scrollable: any;
    let lastY = 0;
    
    let onTouchStart = (e: TouchEvent) => {
        scrollable = getScrollParent(e.target as Element)
    }

    let onTouchMove = (e: TouchEvent) => {
        scrollable = getScrollParent(e.target as Element)
      if (scrollable === document.documentElement || scrollable === document.body) {
        console.log('scrolling body')
        if (e.cancelable) {
            e.preventDefault();
         }
        return;
      }
    //   let y = e.changedTouches[0].pageY;
    //   let scrollTop = scrollable.scrollTop;
    //   let bottom = scrollable.scrollHeight - scrollable.clientHeight;
    //   console.log('not scrolling body')
    //   if ((scrollTop <= 0 && y > lastY) || (scrollTop >= bottom && y < lastY)) {
    //     if (e.cancelable) {
    //         e.preventDefault();
    //      }
    //   }
  
    //   lastY = y;
    };
    let removeEvents = chain(
      addEvent(document, 'touchmove', onTouchMove, {passive: false, capture: true}),
      addEvent(document, 'touchmove', onTouchStart, {passive: false, capture: true}),
    );
  
    return () => {
        removeEvents()
    };
  }

  export function chain(...callbacks: any[]): (...args: any[]) => void {
    return (...args: any[]) => {
      for (let callback of callbacks) {
        if (typeof callback === 'function') {
          callback(...args);
        }
      }
    };
  }
  
  // Adds an event listener to an element, and returns a function to remove it.
  function addEvent<K extends keyof GlobalEventHandlersEventMap>(
    target: EventTarget,
    event: K,
    handler: (this: Document, ev: any) => any,
    options?: boolean | AddEventListenerOptions
  ) {
    target.addEventListener(event, handler, options);
    return () => {
      target.removeEventListener(event, handler, options);
    };
  }

  export function getScrollParent(node: Element): Element {
    if (isScrollable(node)) {
      node = node.parentElement!;
    }
  
    while (node && !isScrollable(node)) {
      node = node.parentElement!;
    }
  
    return node || document.scrollingElement || document.documentElement;
  }
  
  export function isScrollable(node: Element): boolean {
    let style = window.getComputedStyle(node);
    return /(auto|scroll)/.test(style.overflow + style.overflowX + style.overflowY);
  }
