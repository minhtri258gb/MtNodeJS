#include <windows.h>
#include <iostream>

int main(int argc, char *argv[])
{
	HWND hWnd = GetConsoleWindow();
	if (hWnd == NULL) {
		std::cout << "Không tìm thấy cửa sổ console!" << std::endl;
		return 1;
	}

	bool toogle = false;

	if (argc >= 1) {
		if (*argv[1] == '0')
			toogle = false;
		else if (*argv[1] == '1')
			toogle = true;
	}

	// Ẩn cửa sổ
	ShowWindow(hWnd, toogle ? SW_HIDE : SW_SHOW);

	return 0;
}
