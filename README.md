# Personal website

This repository holds the files for my personal website, accessible at [tdemareuil.github.io](tdemareuil.github.io).

# SQL translator

It also includes a SQL queries translator (Hive ↔︎ Presto ↔︎ Vertica) that I developed as a side project next to my job at Criteo. It's available at: [https://tdemareuil.github.io/translate_sql.html](https://tdemareuil.github.io/translate_sql.html).

### Goals

* Faster conversion of SQL queries between Hive ↔︎ Presto ↔︎ Vertica
* Less hurdle checking the small language details manually, less errors
* Mainly for data analysis purposes, not prod

### Possible improvements

* Some array functions and concatenation operations still aren’t supported by the script
* I tried to make it robust to a lot of situations, but sometimes you still might need to check the output of conversion
* Translating more complex, production-ready queries, and potentially in batches, is a [very complicated task](https://github.com/prestodb/presto/issues/13287) and could be an entire project of its own.

### Detailed capabilities

<table>
    <colgroup>
        <col/>
        <col/>
        <col/>
        <col/>
        <col/>
    </colgroup>
    <tbody>
        <tr>
            <th>
                <p/>
            </th>
            <th>
                <p style="text-align: center;"><strong>Hive</strong></p>
            </th>
            <th>
                <p style="text-align: center;"><strong>Presto</strong></p>
            </th>
            <th>
                <p style="text-align: center;"><strong>Vertica</strong></p>
            </th>
            <th>
                <p style="text-align: center;"><em>Translation available</em></p>
            </th>
        </tr>
        <tr>
            <td rowspan="7" valign="top">
                <p><strong>Operators & common functions</strong></p>
            </td>
            <td>
                <p> <code>LATERAL VIEW EXPLODE (original_column) t AS new_column</code>, with small (but very tricky) syntax differences when you explode an array, a map or an array of structs</p>
            </td>
            <td>
                <p><code>CROSS JOIN UNNEST(original_column) AS t (new_column)</code>, with small (but very tricky) syntax differences when you unnest an array, a map or an array of structs</p>
            </td>
            <td>
                <p><code>CROSS JOIN UNNEST(original_column) AS t (new_column)</code>, with small (but very tricky) syntax differences when you unnest an array, a map or an array of structs</p>
            </td>
            <td>
                <p align="center">
                    ✅
                </p>
            </td>
        </tr>
        <tr>
            <td>
                <p><code>LATERAL VIEW OUTER EXPLODE</code> (to keep rows with empty array/map)</p>
            </td>
            <td>
                <p><code>LEFT JOIN UNNEST</code> (to keep rows with empty array/map)</p>
            </td>
            <td>
                <p><code>LEFT JOIN UNNEST</code> (to keep rows with empty array/map)</p>
            </td>
            <td>
                <p align="center">
                    ✅
                </p>
            </td>
        </tr>
        <tr>
            <td>
                <p>Supports <code>IF()</code> function (and <code>CASE WHEN</code>)</p>
            </td>
            <td>
                <p>Supports <code>IF()</code> function (and <code>CASE WHEN</code>)</p>
            </td>
            <td>
                <p>Doesn't support <code>IF()</code> function &rarr; use <code>CASE WHEN</code></p>
            </td>
            <td>
                <p align="center">
                    ✅
                </p>
            </td>
        </tr>
        <tr>
            <td>
                <p>Supports <code>LIKE</code> and <code>RLIKE</code> (regex), not <code>ILIKE</code> (case insensitive)</p>
            </td>
            <td>
                <p>Supports <code>LIKE</code> only</p>
            </td>
            <td>
                <p>Supports <code>LIKE</code> and <code>ILIKE</code> (case insensitive), not <code>RLIKE</code> (regex)</p>
            </td>
            <td>
                <p align="center">
                    ✅
                </p>
            </td>
        </tr>
        <tr>
            <td>
                <p>Doesn't support <code>IFNULL</code> function &rarr; use <code>COALESCE</code></p>
            </td>
            <td>
                <p>Doesn't support <code>IFNULL</code> function &rarr; use <code>COALESCE</code></p>
            </td>
            <td>
                <p>Supports <code>IFNULL</code> function (and <code>COALESCE</code>). Also supports <code>NULLIFZERO</code> and <code>ZEROIFNULL</code>.</p>
            </td>
            <td>
                <p align="center">
                    ✅
                </p>
            </td>
        </tr>
        <tr>
            <td>
                <p>Use <code>PMOD(n,m)</code> to return the modulus (remainder) of <code>n</code> divided by <code>m</code></p>
            </td>
            <td>
                <p>Use <code>MOD(n,m)</code> to return the modulus (remainder) of <code>n</code> divided by <code>m</code></p>
            </td>
            <td>
                <p>Use <code>MOD(n,m)</code> to return the modulus (remainder) of <code>n</code> divided by <code>m</code></p>
            </td>
            <td>
                <p align="center">
                    ✅
                </p>
            </td>
        </tr>
        <tr>
            <td>
                <p>To compute any quantile, use <code>PERCENTILE_APPROX(x, 0.7)</code></p>
            </td>
            <td>
                <p>To compute any quantile, use <code>APPROX_PERCENTILE(x, 0.7)</code></p>
            </td>
            <td>
                <p>To compute any quantile, use <code>APPROXIMATE_PERCENTILE(x USING PARAMETERS percentile=0.7)</code></p>
            </td>
            <td>
                <p align="center">
                    ✅
                </p>
            </td>
        </tr>
        <tr>
            <td rowspan="3" valign="top">
                <p><strong>Data types</strong></p>
            </td>
            <td>
                <p>Dividing <code>7</code> by <code>2</code> will result in <code>3.5</code></p>
            </td>
            <td>
                <p>Dividing <code>7</code> by <code>2</code> will result in <code>3</code> &rarr; to perform floating point division on two integers, cast one of them as a double</p>
            </td>
            <td>
                <p>Dividing <code>7</code> by <code>2</code> will result in <code>3.5</code></p>
            </td>
            <td>
                <p align="center">
                    ✅
                </p>
            </td>
        </tr>
        <tr>
            <td>
                <p>Supports <code>STRING</code> format or <code>VARCHAR(n)</code>, with n specified</p>
            </td>
            <td>
                <p>Doesn't support <code>STRING</code> format but supports <code>VARCHAR(n)</code>, with n specified or not</p>
            </td>
            <td>
                <p>Doesn't support <code>STRING</code> format but supports <code>VARCHAR(n)</code>, with n specified or not</p>
            </td>
            <td>
                <p align="center">
                    ✅
                </p>
            </td>
        </tr>
        <tr>
            <td>
                <p>Cannot use <code>BOOL</code> instead of <code>BOOLEAN</code></p>
            </td>
            <td>
                <p>Cannot use <code>BOOL</code> instead of <code>BOOLEAN</code></p>
            </td>
            <td>
                <p>Can use <code>BOOL</code> instead of <code>BOOLEAN</code></p>
            </td>
            <td>
                <p align="center">
                    ✅
                </p>
            </td>
        </tr>
        <tr>
            <td rowspan="4" valign="top">
                <p><strong>Syntax</strong></p>
            </td>
            <td>
                <p>Can start an identifier with numbers</p>
            </td>
            <td>
                <p>Identifiers that start with numbers must be quoted using double quotes: <code>&quot;7day_active&quot;</code></p>
            </td>
            <td>
                <p>Identifiers that start with numbers must be quoted using double quotes: <code>&quot;7day_active&quot;</code></p>
            </td>
            <td>
                <p align="center">
                    ✅
                </p>
            </td>
        </tr>
        <tr>
            <td>
                <p>Doesn't support <code>::</code> notation for type casting</p>
            </td>
            <td>
                <p>Doesn't support <code>::</code> notation for type casting</p>
            </td>
            <td>
                <p>Supports <code>::</code> notation for type casting</p>
            </td>
            <td>
                <p align="center">
                    ✅
                </p>
            </td>
        </tr>
        <tr>
            <td>
                <p>Uses <code>`</code> for identifiers</p>
            </td>
            <td>
                <p>Uses <code>"</code> for identifiers</p>
            </td>
            <td>
                <p>Uses <code>"</code> for identifiers</p>
            </td>
            <td>
                <p align="center">
                    ✅
                </p>
            </td>
        </tr>
        <tr>
            <td>
                <p>Cannot use column index in <code>GROUP BY</code> and <code>ORDER BY</code> (or change parameters: <code>SET hive.groupby.orderby.position.alias=true</code>)</p>
            </td>
            <td>
                <p>Can use column index in <code>GROUP BY</code> and <code>ORDER BY</code></p>
            </td>
            <td>
                <p>Can use column index in <code>GROUP BY</code> and <code>ORDER BY</code></p>
            </td>
            <td>
                <p align="center">
                    ✅
                </p>
            </td>
        </tr>
        <tr>
            <td rowspan="9" valign="top">
                <p><strong>Array operations</strong></p>
            </td>
            <td>
                <p>Arrays are indexed starting from 0</p>
            </td>
            <td>
                <p>Arrays are indexed starting from 1</p>
            </td>
            <td>
                <p>Arrays are indexed starting from 0</p>
            </td>
            <td>
                <p align="center">
                    ✅
                </p>
            </td>
        </tr>
        <tr>
            <td>
                <p>Aggregate values as an array: use <code>collect_list()</code>. Add the <code>DISTINCT</code> keyword to deduplicate or use <code>collect_set()</code> to do both at once.</p>
            </td>
            <td>
                <p>Aggregate values as an array: use <code>array_agg()</code>. Add the <code>DISTINCT</code> keyword or <code>array_distinct()</code> to deduplicate (note that the <code>DISTINCT</code> keyword cannot be used in a window function in Presto).</p>
            </td>
            <td>
                <p>Use <code>listagg()</code> to aggregate values <em>as comma-separated strings</em>, not as a proper array (could use <code>STRING_TO_ARRAY('['||col||']', ',')</code> to do the trick, and could add <code>USING PARAMETERS max_length=1000000</code> to avoid length errors). Add the <code>DISTINCT</code> keyword to deduplicate.</p>
            </td>
            <td>
                <p align="center">
                    ✅
                </p>
            </td>
        </tr>
        <tr>
            <td>
                <p>Standalone array deduplication: use <code>collect_set(flatname) from (select id, flatname from test lateral view explode(name) t as flatname) g group by id</code></p>
            </td>
            <td>
                <p>Standalone array deduplication: use <code>array_distinct()</code></p>
            </td>
            <td>
                <p>Seems like we cannot deduplicate an array without cross-joining.</p>
            </td>
            <td>
                <p align="center">
                    🚫
                </p>
            </td>
        </tr>
        <tr>
            <td>
                <p>Forced to use <code>lateral view explode</code> to run array functions (regular min, max, sum, avg)</p>
            </td>
            <td>
                <p>All the main array functions (min, max, sum, avg, etc.) start with <code>array_{function}()</code>. Note that for the average it&rsquo;s <code>array_average()</code> (not <code>avg</code>)</p>
            </td>
            <td>
                <p>All the main array functions (min, max, sum, avg, etc.) start with <code>array_{function}()</code>.</p>
            </td>
            <td>
                <p align="center">
                    🚫
                </p>
            </td>
        </tr>
        <tr>
            <td>
                <p>No direct equivalent</p>
            </td>
            <td>
                <p>Complex array functions such as <code>map</code>, <code>transform</code>, <code>map_from_entries</code></p>
            </td>
            <td>
                <p>No direct equivalent</p>
            </td>
            <td>
                <p align="center">
                    🚫
                </p>
            </td>
        </tr>
        <tr>
            <td>
                <p><code>size()</code> returns the length of an array</p>
            </td>
            <td>
                <p><code>cardinality()</code> returns the length of an array</p>
            </td>
            <td>
                <p><code>array_length()</code> returns the length of an array</p>
            </td>
            <td>
                <p align="center">
                    ✅
                </p>
            </td>
        </tr>
        <tr>
            <td>
                <p>Use <code>ARRAY(content)</code> to create an array</p>
            </td>
            <td>
                <p>Use <code>ARRAY[content]</code> to create an array</p>
            </td>
            <td>
                <p>Should be able to use <code>ARRAY[content]</code> to create an array (?)</p>
            </td>
            <td>
                <p align="center">
                    ✅
                </p>
            </td>
        </tr>
        <tr>
            <td>
                <p>Concatenate strings with <code>concat_ws('sep', string1, string2, etc.)</code> or <code>concat_ws('sep', array(strings))</code> (input must be strings or array of strings, contrary to Presto and Vertica) </p>
            </td>
            <td>
                <p>Concatenate strings with <code>array_join(array, 'sep')</code> or with the <code>||</code> operator</p>
            </td>
            <td>
                <p>Concatenate strings with <code>concat(val1, val2)</code> (2 elements max) or with the <code>||</code> operator</p>
            </td>
            <td>
                <p align="center">
                    🚫
                </p>
            </td>
        </tr>
        <tr>
            <td>
                <p><code>NAMED_STRUCT('A', col_A, 'B', col_B)</code> (realiasing inside the struct is not possible when doing Hive &rarr; Presto / Vertica)</p>
            </td>
            <td>
                <p><code>ROW(col_A, col_B)</code> or <code>CAST(ROW(col_A, col_B) as ROW(A int, B int))</code>(realiasing of the struct is possible when doing Presto / Vertica -&gt; Hive)</p>
            </td>
            <td>
                <p><code>ROW(col_A, col_B)</code> or <code>CAST(ROW(col_A, col_B) as ROW(A int, B int))</code>(realiasing of the struct is possible when doing Presto / Vertica -&gt; Hive)</p>
            </td>
            <td>
                <p align="center">
                    ✅
                </p>
            </td>
        </tr>
        <tr>
            <td rowspan="7" valign="top">
                <p><strong>Date & Time</strong></p>
            </td>
            <td>
                <p>Use <code>from_unixtime()</code> and <code>unix_timestamp()</code> functions to convert timestamp &harr;︎ unixtime</p>
            </td>
            <td>
                <p>Use <code>from_unixtime()</code> and <code>to_unixtime()</code> functions to convert timestamp &harr;︎ unixtime</p>
            </td>
            <td>
                <p>Use <code>to_timestamp()</code> and <code>EXTRACT(EPOCH from date)</code> to convert timestamp &harr;︎ unixtime</p>
            </td>
            <td>
                <p align="center">
                    ✅
                </p>
            </td>
        </tr>
        <tr>
            <td>
                <p><code>select current_date - INTERVAL '10' day</code> returns a timestamp, and doesn't need <code>''</code></p>
            </td>
            <td>
                <p><code>select current_date - INTERVAL '10' day</code> returns a date and needs <code>''</code></p>
            </td>
            <td>
                <p><code>select current_date - INTERVAL '10' day</code> returns a timestamp and needs <code>''</code></p>
            </td>
            <td>
                <p align="center">
                    ✅
                </p>
            </td>
        </tr>
        <tr>
            <td>
                <p>Supports <code>to_date()</code> function</p>
            </td>
            <td>
                <p>Doesn't support <code>to_date()</code> function &rarr; use <code>DATE()</code></p>
            </td>
            <td>
                <p>Doesn't support <code>to_date()</code> function &rarr; use <code>DATE()</code></p>
            </td>
            <td>
                <p align="center">
                    ✅
                </p>
            </td>
        </tr>
        <tr>
            <td>
                <p>You can extract date parts with <code>TRUNC(str, pattern)</code> or <code>EXTRACT(part from str)</code></p>
            </td>
            <td>
                <p>You can extract date parts with <code>DATE_TRUNC(part, date)</code> or <code>EXTRACT(part from date)</code></p>
            </td>
            <td>
                <p>You can extract date parts with <code>TRUNC(date, pattern)</code> or <code>TIMESTAMP_TRUNC(date, pattern)</code> or <code>DATE_TRUNC(part, date)</code> or <code>DATE_PART(part, date)</code> or <code>EXTRACT(part from date)</code></p>
            </td>
            <td>
                <p align="center">
                    ✅
                </p>
            </td>
        </tr>
        <tr>
            <td>
                <p><code>DATEDIFF(str, str)</code> only returns a day difference, works with strings, and substracts the other way round vs. Presto and Vertica</p>
            </td>
            <td>
                <p><code>DATE_DIFF(unit, date, date)</code></p>
            </td>
            <td>
                <p><code>DATEDIFF(unit, date, date)</code> or <code>TIMESTAMPDIFF(unit, str, str)</code></p>
            </td>
            <td>
                <p align="center">
                    ✅
                </p>
            </td>
        </tr>
        <tr>
            <td>
                <p><code>DATE_FORMAT(str, str_format)</code> works with a date already formatted as a string + beware of pattern letters differences</p>
            </td>
            <td>
                <p><code>DATE_FORMAT(date, str_format)</code> only works with a date + beware of pattern letters differences</p>
            </td>
            <td>
                <p><code>TO_CHAR(date, str_format)</code> only works with a date + beware of pattern letters differences</p>
            </td>
            <td>
                <p align="center">
                    ✅
                </p>
            </td>
        </tr>
        <tr>
            <td>
                <p><code>DATE_ADD(str, value)</code>, can only add days, supports date string, negative values are possible but <code>DATE_SUB</code> exists as well</p>
            </td>
            <td>
                <p><code>DATE_ADD(unit_str, value, date)</code>, with possible negative value, only datetime formats</p>
            </td>
            <td>
                <p><code>TIMESTAMPADD(unit_str, value, date)</code>, with possible negative value, supports date string, returns a timestamp (not date)</p>
            </td>
            <td>
                <p align="center">
                    ✅
                </p>
            </td>
        </tr>
    </tbody>
</table>

### User Interface

Usually, to run Python code in the browser, you need to set-up a **web app** (e.g. Flask) and to host it on a server (e.g. Heroku or PythonAnywhere).
However, it's possible to run a short Python script directly in the browser's front end, even more easily, thanks to **Pyodide**. 

Pyodide is a Python distribution for the browser and Node.js based on WebAssembly. It comes with a robust Javascript ⟺ Python foreign function interface so that you can freely mix these two languages in your code. See [documentation](https://pyodide.org/en/stable/).

<blockquote>
    <p><u>How does Pyodide work in practice?</u></p>
    <p>&rarr; You just have to include the Pyodide &lt;script&gt; at the start of your HTML file. Then you can access functions such as <code>runPython</code>. You can access variables from the Python scope from JS, and vice versa. All the main Python packages are supported, and you can import others manually.</p>
</blockquote>

You can access my small tool at: <a href="https://tdemareuil.github.io/translate_sql.html">https://tdemareuil.github.io/translate_sql.html</a>. 

Of course, the UI is <strong>very simple</strong> (pure HTML), and it's <strong>not secure</strong> at all (you can actually see if the full Python code if you just inspect the HTML..!) — but it's a first step!
