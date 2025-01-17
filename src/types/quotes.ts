export interface QuoteTotal {
  _id: string;
  totalQuoteAmount: number;
}

export interface TotalType {
  quotedAmount: number;
  invoiceToRaised: number;
  balanceToRaise: number;
  approvedQuotes: number;
}

export interface TotalProps {
  quoteTotals: QuoteTotal[];
  totals: TotalType;
}

export interface Quote {
  _id: string;
  quotationId: string;
  details: {
    coverImage: string;
    createdDate: string;
    prefix: string;
    sequenceNumber: number;
    validity: number;
    title: string;
  };
  status: string;
  updatedAt: string;
  createdAt: string;
  digitalSign: string;
  settings: object;
  attachments: [];
  items: [];
}

export interface TotalQuotedAmountType {
  quoteTotals: QuoteTotal[];
  totals: TotalType;
}
