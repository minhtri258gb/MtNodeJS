#include <iostream>
#include <Windows.h>

using namespace std;

void HideConsole(bool toogle)
{
    ::ShowWindow(::GetConsoleWindow(), toogle ? SW_HIDE : SW_SHOW);
}

int main(int argc, char *argv[])
{
    bool toogle = false;

    if (argc >= 1) {
        if (*argv[1] == '0') toogle = false;
        else if (*argv[1] == '1') toogle = true;
    }
    
    HideConsole(toogle);
    return 0;
}
