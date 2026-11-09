import { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import type { LayoutChangeEvent } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const PRODUCT_GRID_PADDING: number = 16;
export const PRODUCT_GRID_GAP: number = 12;

type ProductGrid = {
  columns: number;
  cardWidth: number;
  onLayout: (event: LayoutChangeEvent) => void;
};

/** Ukuran kartu yang sama untuk katalog dan favorit, termasuk saat rotasi. */
export default function useProductGrid(): ProductGrid {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [contentWidth, setContentWidth] = useState<number>(width - insets.left - insets.right);
  const columns: number = width >= 768 ? 4 : width >= 500 ? 3 : 2;
  const cardWidth: number = Math.max(0,
    (contentWidth - 2 * PRODUCT_GRID_PADDING - (columns - 1) * PRODUCT_GRID_GAP) / columns);

  function onLayout(event: LayoutChangeEvent): void {
    setContentWidth(event.nativeEvent.layout.width);
  }

  return { columns, cardWidth, onLayout };
}
