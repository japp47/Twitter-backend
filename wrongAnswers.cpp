#include <bits/stdc++.h>
using namespace std;

struct Rect {
    int width;
    int height;
};

int main(){
    ios_base:: sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    cout<<sizeof(Rect)<<endl; //given 4 in key

    int x = 5,y=3;
    cout<<(x+++y)<<endl; //given compilation error

    return 0;
}