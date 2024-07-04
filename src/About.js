import React from 'react';
import jsonData from './example.json';

const AboutPage = () => {

    return (
        <div className='text-content'>
            <div>
                <h2>About the App</h2>
                <p>This is a metadata browser for the texts in al-maktaba al-shamela that were scraped of al-maktaba al-shamila on 7/2/2004, you can brose the texts on the <a href="http://www.shamela.ws">shamela website</a> as well as through their application. I am in the process of cleaning the scraped texts and uploading them to be available to all, currently you can download individual texts, but soon the entire corpus will be available on GitHub. While many of these texts are already scraped and available via the <a href="https://openiti.org/">Open Islamicate Texts Initiative</a> and <a href="https://kitab-project.org/">KITAB</a> project <a href="https://zenodo.org/records/10007820">meta-corpus</a>, a significant portion is not. Furthermore, the texts in the OITI/KITAB corpus are encoded in their custom mARkdown schema. While this has its benefits for token and phrase-level tagging, it is somewhat cumbersome and there are many edge cases that make cleaning the texts difficult. Additionally, the metadata for the OITI/KITAB files are not standardized, with varying field names, missing items, etc., so I've tried to standardize the metadata and the text by putting them in .json format.</p>
                <h4>Explanation of JSON Keys and Values</h4>
                <p>Each text is structured the same, with varying data in book_meta and author_meta (see below):</p>
                <div className='about-table-container flex'>
                    <div class="third-column">
                        <pre>{JSON.stringify(jsonData, null, 2)}</pre>
                    </div>
                    <table className='json-preview'>
                        <tbody>
                            <tr>
                                <td>text_id
                                </td>
                                <td>This is the same as the unique al-shamela text_id
                                </td>
                            </tr>
                            <tr>
                                <td>title
                                </td>
                                <td>The arabic title
                                </td>
                            </tr>
                            <tr>
                                <td>cat
                                </td>
                                <td>The category from al-shamela, originally an integer referencing an external SQL db, but I've replaced them with the arabic text
                                </td>
                            </tr>
                            <tr>
                                <td>author_id
                                </td>
                                <td>Unique author id from al-shamela
                                </td>
                            </tr>
                            <tr>
                                <td>date
                                </td>
                                <td>Death date of the author
                                </td>
                            </tr>
                            <tr>
                                <td>printed
                                </td>
                                <td> "1" is a printed text; "2" is machine OCR'd and page numbers are likely erroneous; "3" is a includes items that are scraped from online, theses, dissertations, manuscripts, tc.
                                </td>
                            </tr>
                            <tr>
                                <td>pdf
                                </td>
                                <td>Contains a pdf link, usually to archive.org, if available.
                                </td>
                            </tr>
                            <tr>
                                <td>author_sh
                                </td>
                                <td>This is the author's shuhra
                                </td>
                            </tr>
                            <tr>
                                <td>book_meta
                                </td>
                                <td>This contains the book's metadata, almost always the title (again), the author (again), the editors/advisors/overseers, the publisher, the publication edition, the number of pages, some notes, and other "custom fields," including things like takhrīj, iʿtināʾ, etc.
                                </td>
                            </tr>
                            <tr>
                                <td>author_meta
                                </td>
                                <td>This contains author biographical information, almost always with citations. This is available on sham-scrap for individual author pages
                                </td>
                            </tr>
                            <tr>
                                <td>volumes
                                </td>
                                <td>This is the beginning of the actual text and volumes contains nested volumes and their respective pages
                                </td>
                            </tr>
                            <tr>
                                <td>vol_num
                                </td>
                                <td> This will be "" if the book was published in a single volume. Occasionally this will be "مقدمة" or "0" depending on how al-shamela encoded the text
                                </td>
                            </tr>
                            <tr>
                                <td>page_id
                                </td>
                                <td>Unique page-level page_id from al-shamela, this almost invariably starts at 0
                                </td>
                            </tr>
                            <tr>
                                <td>page_num
                                </td>
                                <td>This is the actual page number of the text, which  usually matches the page_num of texts from printed copies. Occasionally this is blank, usually the case for front matter. Also, the pag_num sometimes restarts, again usually because front matter will begin with pagination from 1 and then the body of the text will begin again from 1
                                </td>
                            </tr>
                            <tr>
                                <td>content
                                </td>
                                <td>This contains the page content with line breaks preserved by "\n". The only other structural annotations are chapter headings are in "{"<head></head>"}" tags
                                </td>
                            </tr>
                            <tr>
                                <td>chapter
                                </td>
                                <td>This contains the unique chapter IDs for any chapter(s) that appear on this page. These are from al-shamela in the following format: {"<unique chapter_id>:<unique_chapter_parent_id>"}, which is used to denote whether a chapter is a subchapter. For example, for 1:0, this signifies chapter_id 1 is on this page and a parent_id is "0" that means it is a book-level chapte, i.e. it has no parent chapter. If another chapter is 54:50 that the chapter with a unique_id of 54 is on this page and it is a subchapter of the chapter with a unique_id of 50. The unique_ids are sequential, so unique_id 54 is the 54th chapter in the book overall, but this includes all subchapters
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div>

                <h2>About Me</h2>
                <p>This was developed by Antonio Musto, a PhD candidate at NYU in the Middle Eastern and Islamic Studies department. You can learn more about his work at <a href="https://nyu.academia.edu/AntonioMusto">academia.edu</a> and his <a href="https://github.com/ammusto">github</a>. You can also follow him on twitter <a href="https://x.com/deepcutiqtibas">@deepcutiqtibas</a>.</p>
                <h2>Copyright</h2>
                <p>In terms of copyright, this project is in alignment with <a href="https://openiti.org/docs/Copyright_Questions.html">OpenITI's position</a>.</p>
            </div>
        </div>

    );
};

export default AboutPage;