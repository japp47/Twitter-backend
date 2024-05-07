#include<bits/stdc++.h>
using namespace std;
#define ll long long

int freq[1000001];
int distinct;
struct query {
	int L;
	int R;
	int qno;
	int blockno;
	bool operator < (query& q2){
		if(blockno < q2.blockno) return 1;
		else if(blockno > q2.blockno) return 0;
		else return R < q2.R;
	}
	
};
void Add(int element) {
	if(freq[element] == 0) distinct++;
	freq[element]++;
}
void Remove(int element) {
	freq[element]--;
	if(freq[element] == 0) distinct--;
	
}
void adjust(int& curr_l, int& curr_r, query& q, vector<int>& arr){
	while(curr_l < q.L) {
		Remove(arr[curr_l]);
		curr_l++;
	}
	while(curr_l > q.L) {
		curr_l--;
		Add(arr[curr_l]);
	}
	while(curr_r < q.R) {
		curr_r++;
		Add(arr[curr_r]);
	}
	while(curr_r > q.R) {
		Remove(arr[curr_r]);
		curr_r--;
	}
}
void solve(vector<query>& queries, vector<int>& arr){
	vector<int> res(queries.size());
	sort(queries.begin(),queries.end());
	memset(freq, 0, sizeof(freq));
	distinct = 0;
	int curr_l= queries[0].L;
	int curr_r = queries[0].R;
	for(int i = queries[0].L; i<=queries[0].R; i++) Add(arr[i]);
	res[queries[0].qno] = distinct;
	for(int i = 1;i<queries.size();i++)
	{
		adjust(curr_l, curr_r, queries[i], arr);
		res[queries[i].qno] = distinct;
	}
	for(int x: res) cout<<x<<'\n';

}
int main() {
	
	int n,q;
	cin>>n;
	int rn = sqrt(n);
	vector<int> arr(n);
	for(int i =0;i<n;i++) cin>>arr[i];
	cin>>q;
	vector<query> queries(q);
	for(int i =0;i<q;i++) {
		int u,v;
		cin>>u>>v;
		queries[i].L = u-1;
		queries[i].R = v-1;
		queries[i].qno = i;
		queries[i].blockno = u/rn;
	}
	solve(queries, arr);
	
	return 0;
}