interface ParamId {
  id: string;
}

interface ParamSlug {
  slug?: string;
}

interface ParamPaymentStatus {
  status?: 'success' | 'failure';
}

export interface PageIdParam {
  params: ParamId;
}

export interface PageSlugParam {
  params: ParamSlug;
}

export interface PagePaymentStatusSearchParam {
  searchParams: ParamPaymentStatus;
}
