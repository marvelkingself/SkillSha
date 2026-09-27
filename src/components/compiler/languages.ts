// Mirrors the online-compiler backend's LANG config (id + starter code only —
// execution limits live server-side).

export type LanguageId = "python" | "javascript" | "java" | "cpp";

export interface LanguageConfig {
  id: LanguageId;
  name: string;
  version: string;
  badge: string;
  color: string;
  image: string;
  ext: string;
  defaultName: string;
  command: (file: string, entry?: string) => string;
  compiled: boolean;
  starter: string;
}

export const LANGUAGES: Record<LanguageId, LanguageConfig> = {
  python: {
    id: "python",
    name: "Python",
    version: "Python 3.12",
    badge: "Py",
    color: "#3776AB",
    image: "python:3.12-alpine",
    ext: ".py",
    defaultName: "main",
    command: (f) => `python ${f}`,
    compiled: false,
    starter: `def reverse(arr):
    start, end = 0, len(arr) - 1
    while start < end:
        arr[start], arr[end] = arr[end], arr[start]
        start += 1
        end -= 1
    return arr


numbers = [10, 20, 30, 40, 50]
print("Original:", *numbers)
print("Reversed:", *reverse(numbers))
`,
  },

  javascript: {
    id: "javascript",
    name: "JavaScript",
    version: "Node 22",
    badge: "JS",
    color: "#E9B44C",
    image: "node:22-alpine",
    ext: ".js",
    defaultName: "main",
    command: (f) => `node ${f}`,
    compiled: false,
    starter: `function reverse(arr) {
  let start = 0;
  let end = arr.length - 1;

  while (start < end) {
    [arr[start], arr[end]] = [arr[end], arr[start]];
    start++;
    end--;
  }
  return arr;
}

const numbers = [10, 20, 30, 40, 50];
console.log("Original:", numbers.join(" "));
console.log("Reversed:", reverse(numbers).join(" "));
`,
  },

  java: {
    id: "java",
    name: "Java",
    version: "Temurin 21",
    badge: "Jv",
    color: "#E76F00",
    image: "eclipse-temurin:21-alpine",
    ext: ".java",
    defaultName: "Main",
    command: (f, entry) => `javac ${f} && java ${entry}`,
    compiled: true,
    starter: `public class ReverseArray {
    public static void main(String[] args) {
        int[] arr = { 10, 20, 30, 40, 50 };

        int start = 0;
        int end = arr.length - 1;

        while (start < end) {
            int temp = arr[start];
            arr[start] = arr[end];
            arr[end] = temp;

            start++;
            end--;
        }

        System.out.println("Reversed Array:");
        for (int num : arr) {
            System.out.print(num + " ");
        }
    }
}
`,
  },

  cpp: {
    id: "cpp",
    name: "C++",
    version: "GCC 14",
    badge: "C+",
    color: "#00599C",
    image: "gcc:14",
    ext: ".cpp",
    defaultName: "main",
    command: (f) => `g++ ${f} -o main && ./main`,
    compiled: true,
    starter: `#include <iostream>
#include <vector>
using namespace std;

void reverseArray(vector<int>& arr) {
    int start = 0;
    int end = arr.size() - 1;

    while (start < end) {
        swap(arr[start], arr[end]);
        start++;
        end--;
    }
}

int main() {
    vector<int> arr = { 10, 20, 30, 40, 50 };
    reverseArray(arr);

    cout << "Reversed Array:" << endl;
    for (int num : arr) cout << num << " ";
    return 0;
}
`,
  },
};

export const LANG_ORDER: LanguageId[] = ["python", "javascript", "java", "cpp"];
export const LANG_LIST: LanguageConfig[] = LANG_ORDER.map((id) => LANGUAGES[id]);

/* ── Auto file name ────────────────────────────────────────────
   Name comes straight from the code — nothing to type. Matches the
   backend's naming.js logic so the file created in-container is the
   same one shown in the tab. */

const SAFE = /^[A-Za-z_][A-Za-z0-9_]{0,63}$/;

const first = (code: string, re: RegExp, group = 1): string | null => {
  const m = code.match(re);
  return m && SAFE.test(m[group]) ? m[group] : null;
};

export function entryName(languageId: LanguageId, code = ""): string {
  const lang = LANGUAGES[languageId];
  let name: string | null = null;

  switch (languageId) {
    case "java":
      name =
        first(code, /public\s+(?:final\s+|abstract\s+)?class\s+([A-Za-z_$][\w$]*)/) ||
        first(code, /class\s+([A-Za-z_$][\w$]*)/);
      break;
    case "python":
      name = first(code, /^\s*class\s+([A-Za-z_]\w*)/m);
      if (name) name = name.replace(/([a-z0-9])([A-Z])/g, "$1_$2").toLowerCase();
      break;
    case "javascript":
      name = first(code, /^\s*(?:export\s+default\s+)?class\s+([A-Za-z_$][\w$]*)/m);
      break;
    case "cpp":
      name = first(code, /^\s*(?:class|struct)\s+([A-Za-z_]\w*)/m);
      break;
    default:
      break;
  }

  return name || lang.defaultName;
}

export function fileNameFor(languageId: LanguageId, code = ""): string {
  return entryName(languageId, code) + LANGUAGES[languageId].ext;
}

export function commandFor(languageId: LanguageId, code = ""): string {
  const entry = entryName(languageId, code);
  return LANGUAGES[languageId].command(entry + LANGUAGES[languageId].ext, entry);
}

export default LANGUAGES;
