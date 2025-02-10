export interface DBClient<T> {
	getClient(): T;
}
