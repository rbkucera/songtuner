import { useTheme } from '../useTheme';
import type { HeaderProps } from '../types';

export function DefaultHeader(_props: HeaderProps) {
  const { theme } = useTheme();
  const t = theme.tokens;
  return (
    <header style={{
      backgroundColor: t.colorPanel as string,
      borderBottom: `1px solid ${t.colorAccent}`,
      padding: '12px 20px',
      textAlign: 'center',
    }}>
      <h1 style={{
        fontFamily: t.fontDisplay as string,
        fontWeight: 700,
        fontSize: '18px',
        letterSpacing: '0.2em',
        color: t.colorText as string,
        margin: 0,
      }}>
        {theme.name}
      </h1>
    </header>
  );
}
