/**
 * This file contains the common player controls like
 * play, pause, next, prev, etc...
 *
 * These function are removed from the main PlayerControls.tsx (the context api provider)
 * and no more supported there since it will update the UI continuosly so we are creating these
 * commons function which does not depends on state, UI, rendering, etc
 * so that the performace could increase in some part...
 */
