class ListQuery {
  final String? q;
  final int page;
  final int pageSize;

  const ListQuery({this.q, this.page = 1, this.pageSize = 20});

  Map<String, dynamic> toQueryParameters() => {
    if (q != null && q!.isNotEmpty) 'q': q,
    'page': page,
    'page_size': pageSize,
  };
}

class PaginationMeta {
  final int count;
  final int page;
  final int pageSize;
  final String? next;
  final String? previous;

  const PaginationMeta({
    required this.count,
    required this.page,
    required this.pageSize,
    this.next,
    this.previous,
  });

  bool get hasNextPage => next != null && next!.isNotEmpty;

  factory PaginationMeta.fromJson(Map<String, dynamic> json) => PaginationMeta(
    count: json['count'],
    page: json['page'],
    pageSize: json['page_size'],
    next: json['next'],
    previous: json['previous'],
  );
}

class PaginatedData<T> {
  final List<T> items;
  final PaginationMeta meta;

  const PaginatedData({required this.items, required this.meta});
}

class PaginationState {
  final int pageSize;

  int _page = 1;
  bool _initial = true;
  bool _hasMore = true;

  PaginationState({this.pageSize = 20});

  int get page => _page;
  bool get isInitial => _initial;
  bool get canFetchMore => !_initial && _hasMore;

  void update(PaginationMeta meta) {
    _initial = false;
    _hasMore = meta.hasNextPage;
    _page += 1;
  }

  void reset() {
    _page = 1;
    _initial = true;
    _hasMore = true;
  }
}
