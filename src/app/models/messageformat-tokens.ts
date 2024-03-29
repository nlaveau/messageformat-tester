export type Token =
  | string
  | Argument
  | MFFunction
  | Plural
  | Select
  | Octothorpe;

export type Argument = {
  type: 'argument';
  arg: Identifier;
};

export type MFFunction = {
  type: 'function';
  arg: Identifier;
  key: 'number' | 'date' | 'time' | 'duration';
  param: {
    tokens: Array<any>;
  };
};

export type Plural = {
  type: 'plural' | 'selectordinal';
  arg: Identifier;
  offset: number;
  cases: PluralCase[];
};

export type Select = {
  type: 'select';
  arg: Identifier;
  cases: SelectCase[];
};

export type Octothorpe = {
  type: 'octothorpe';
};

export type PluralCase = {
  key:
    | 'zero'
    | 'one'
    | 'two'
    | 'few'
    | 'many'
    | 'other'
    | '=0'
    | '=1'
    | '=2'
    | string;
  tokens: Token[];
};

export type SelectCase = {
  key: Identifier;
  tokens: Token[];
};

export type Identifier = string; // not containing whitespace or control characters
