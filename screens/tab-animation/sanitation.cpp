#include <iostream.h>
#include<iomanip.h>
#include<string.h>
#include "str_lib.h"
#include <string>         // std::string
#include "third_party/blink/renderer/core/html/parser/xxs_auditor.h"



int main(void) {

	int str_ch_find(const char string[], const char character, int index);
	int str_read(const char prompt[], char string[], const int max_length);

	char XSS[];
	cin >> XSS[];
	std::string str (XSS[]);
  	std::string checkForInjection ("<string>");
  	std::string checkForClosingScript ("<string>");


  // different member versions of find in the same order as above:
  std::size_t found = str.find(checkForInjection);
  if (found!=std::string::npos)
    std::cout << "first '<string>' found at: " << found << '\n';

  found=str.find(checkForClosingScript,found<<1,6);
  if (found!=std::string::npos)
    std::cout << "closingScript Tag '</string>' found at: " << found << '\n';

  // let's replace the first needle:
  str.replace(str.find(checkForInjection),checkForInjection.length(),"<div></div>");
  std::cout << str << '\n';

		return 0;
}

static void c(char injectionTest[7]) {

		cout << "Enter XSS";
		cin >> injectionTest;

		//vs...


		
				for (i = 0; i < injectionTest.length; i++) {
					putch(injectionTest[i]);

				};

					while(ch = cin.get() != EOF) {

						if(str_read("Enter XSS")){
							
							if (str_ch_find(injectionTest, 's', 0) == null) {
										cout << "No String injection detected \n";
							};

							else {
								 SIndex = index;
								 char s = injectionTest[index];
								 cout << s << "\n";
								cout << " S found \n" ;
								cin.clear();
								if (cin.peeK() != 'r') {
										cout << "No r next to this" <<  s  << " at position "  << SIndex << " found\n";
										
							};

								else {
									cin.clear();
									char r = cin.get();
									cout << r << "\n";
									cout << r <<  " found next at this position" << (SIndex + 1) << " \n ";
									cout << "What it found:" injectionTest[SIndex + 1] << "\n";


										cin.clear();

										if (cin.peeK() != 'i') {
												cout << "No i next to this" <<  r << " at position " << (SIndex + 1)  << " found\n";
												
										};

										else {
											cin.clear();
											char i = cin.get();
											cout << i << "\n";

											cout << i <<  " found next to this position" << (SIndex + 2) << " \n ";
											cout << "What it found:" injectionTest[SIndex + 2] << "\n";

											cin.clear();


												if(cin.peek() != 'n') {
													cout << "No n next to this" <<  i << " at position "  << (SIndex + 3) << " found\n";

												};

												else {
													cin.clear();
													char n = cin.get();
													cout << n << "\n";

													cout << n << " found next to this position " << (SIndex + 3) << "found\n";
													cout << "What it found:" injectionTest[SIndex + 3] << "\n";

													cin.clear();

														if(cin.peek() != 'g') {
															cout << "No g next to this" <<  n << " at position "  << (SIndex + 4) << " found\n";

														};

														else {
															cin.clear();
															char g = cin.get();
															cout << g << "\n";

															cout << g << " found next to this position " << (SInde + 4) << "found\n";
															cout << "What it found:" injectionTest[SIndex + 4] << "\n";

															cin.clear();
											};
										};
									};
								};
							};
						};
					};

			if (cin.EOF()) {
				cout << "Has reached the end of the file.\n";

		};

			if (cin.good()) {
				cout << "Everything has passed correctly\n";
			};
			else if (cin.fail()) {
				cout << "Some error has occured\n";
				cout << injectionTest;
			};