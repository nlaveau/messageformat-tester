export type Token = string | Argument | Plural | Select;

export type Argument = {
  type: 'argument';
  arg: Identifier;
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
