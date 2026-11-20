import { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import { MENU } from "../data/menu.js";

const STORAGE_KEY = "twk-order-v1";
const OrderContext = createContext(null);

function loadInitial() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    // Drop anything that's no longer on the menu
    return Object.fromEntries(
      Object.entries(parsed).filter(([id, qty]) => MENU.some((d) => d.id === id) && qty > 0),
    );
  } catch {
    return {};
  }
}

function reducer(state, action) {
  switch (action.type) {
    case "add":
      return { ...state, items: { ...state.items, [action.id]: (state.items[action.id] || 0) + 1 } };
    case "remove": {
      const qty = (state.items[action.id] || 0) - 1;
      const items = { ...state.items };
      if (qty <= 0) delete items[action.id];
      else items[action.id] = qty;
      return { ...state, items };
    }
    case "delete": {
      const items = { ...state.items };
      delete items[action.id];
      return { ...state, items };
    }
    case "clear":
      return { ...state, items: {} };
    case "open":
      return { ...state, open: true };
    case "close":
      return { ...state, open: false };
    default:
      return state;
  }
}

export function OrderProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, () => ({
    items: typeof window === "undefined" ? {} : loadInitial(),
    open: false,
  }));

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      /* storage unavailable — order just won't persist */
    }
  }, [state.items]);

  const value = useMemo(() => {
    const lines = MENU.filter((d) => state.items[d.id]).map((d) => ({ ...d, qty: state.items[d.id] }));
    const count = lines.reduce((n, l) => n + l.qty, 0);
    return {
      lines,
      count,
      isOpen: state.open,
      qtyOf: (id) => state.items[id] || 0,
      add: (id) => dispatch({ type: "add", id }),
      remove: (id) => dispatch({ type: "remove", id }),
      del: (id) => dispatch({ type: "delete", id }),
      clear: () => dispatch({ type: "clear" }),
      open: () => dispatch({ type: "open" }),
      close: () => dispatch({ type: "close" }),
    };
  }, [state]);

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}

export function useOrder() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrder must be used inside <OrderProvider>");
  return ctx;
}
