#include<bits/stdc++.h>
using namespace std;
#define ll long long

ll cost[1000001];
ll total;

struct query {
    int L;
    int R;
    int qno;
    int blockno;
    bool operator < (query &q2) {
        if(blockno < q2.qno) return 1;
        else if(blockno > q2.qno) return 0;
        else return  R < q2.R;
    }
};
void Add(int element) {
    ll fx = cost[element];
    cost[element] --;
    total-=fx*fx*element;
    total+=(fx+1)*(fx+1)*element;
}
void Remove(int element) {
    ll fx = cost[element];
    cost[element] --;
    total-=fx*fx*element;
    total+=(fx-1)*(fx- 1)*element;
}

void adjust(int curr_l, int curr_r, query& q,vector<ll> &arr) {
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

void solve(vector<query> &queries, vector<ll> &arr) {
    vector<ll> res(queries.size());
    sort(begin(queries), end(queries));
    ll curr_l = 0, curr_r = 0;
    cost[arr[0]] = 1;
    total = arr[0];
    for(query& q: queries) {

        adjust(curr_l, curr_r,q,arr);
        res[q.qno] = total;
    }
    for(auto& x: res) cout<<x<<'\n';

}

int main() {
    ios_base:: sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);
    ll n,t;
	cin>>n>>t;
    memset(cost, 0, sizeof cost);
	int rn = sqrt(n);
	vector<ll> arr(n);
	for(ll i =0;i<n;i++){ 
        cin>>arr[i];
    }
    vector<query> queries(t);
    for(ll i = 0; i<t; i++) {
        ll u,v;
        cin>>u>>v;
        queries[i].L = u-1;
        queries[i].R = v-1;
        queries[i].qno = i;
        queries[i].blockno = u/rn;
        
    }
    solve(queries, arr);

    return 0;

}