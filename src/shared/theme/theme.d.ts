import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    corpico: {
      azul: string;
      violeta: string;
      rojo: string;
      naranja: string;
      amarillo: string;
      verde: string;
      celeste: string;
      terciario: {
        main: string;
        contrastText: string;
        light?: string;
        dark?: string;
      };
    };
  }

  interface PaletteOptions {
    corpico?: {
      azul?: string;
      violeta?: string;
      rojo?: string;
      naranja?: string;
      amarillo?: string;
      verde?: string;
      celeste?: string;
      terciario?: {
        main?: string;
        contrastText?: string;
        light?: string;
        dark?: string;
      };
    };
  }

  interface TypeBackground {
    layout?: string;
  }

  interface TypeText {
    third?: string;
  }
}
