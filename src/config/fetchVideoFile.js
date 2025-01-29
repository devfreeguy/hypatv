import { getFiles } from "./api";

const fetchFiles = async (query) => {
  const files = await getFiles(query);
  console.log('Files from backend:' /n + files);

  const getNewFiles = async () => {
    files = await getFiles(query);
  };
};


/*

-- Plan --
 - Fetch files from backend
   - Then go through the list by filtering the
     list by just the:
     - name
     - name and year
     - name, year, season and episode
 - 
-- Fetch parttern --
  - Movie/Series name + Part number (eg Part 1) + Season and Episode (eg S1.E1) + Release year + Video Resolution

*/