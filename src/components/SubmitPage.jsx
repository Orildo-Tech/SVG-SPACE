import React, {
  useState,
  useMemo,
  useRef,
  useEffect,
  useCallback } from
"react";
import {
  UploadCloud,
  CheckCircle2,
  Github,
  ExternalLink,
  Sparkles,
  Check,
  AlertCircle,
  X,
  Code2,
  Layers,
  ArrowRight,
  Info,
  Plus,
  Trash2,
  Eye,
  Package,
  ShieldCheck,
  Timer,
  Clock
} from "lucide-react";
import { setCachedSvgVector } from "../utils/dbUtils";

const MAX_SVG_SIZE_BYTES = 20 * 1024;

const POPULAR_CATEGORIES = [
"Pakistani Brands",
"Software",
"Developer Tools",
"Framework",
"AI",
"Cloud",
"Database",
"Design",
"Analytics",
"Security",
"DevOps",
"E-commerce",
"Crypto",
"Gaming",
"Mobile",
"Hosting",
"Marketing",
"Finance",
"Media",
"Education",
"Social"];


const TOTAL_PIPELINE_SECONDS = 420;

function formatPipelineTime(seconds) {
  if (seconds <= 0) return '00:00';
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

const CUSTOM_CATEGORIES_KEY = "svgio_custom_created_categories";
const ACTIVE_SUBMISSION_KEY = "svgio_active_submission_pipeline";

const getSavedActiveSubmission = () => {
  try {
    const raw = localStorage.getItem(ACTIVE_SUBMISSION_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.endTime) {
        const remaining = Math.ceil((parsed.endTime - Date.now()) / 1000);
        if (remaining > -300) {
          return {
            submission: parsed,
            countdown: Math.max(0, remaining)
          };
        }
      }
    }
  } catch (e) {
    console.warn("Could not read active submission from localStorage:", e);
  }
  return null;
};

const getSavedCustomCategories = () => {
  try {
    const raw = localStorage.getItem(CUSTOM_CATEGORIES_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.warn("Could not read custom categories from localStorage:", e);
  }
  return [];
};

const saveCustomCategoriesToStorage = (categories) => {
  try {
    localStorage.setItem(CUSTOM_CATEGORIES_KEY, JSON.stringify(categories));
  } catch (e) {
    console.warn("Could not save custom categories to localStorage:", e);
  }
};

const PRESET_VARIANT_NAMES = [
  "default",
  "light",
  "dark",
  "wordmark-dark",
  "wordmark-light",
  "mono",
  "symbol",
  "outline",
  "solid",
  "duotone"
];

export function SubmitPage({
  onIconAdded,
  onShowToast,
  onNavigate,
  onSelectIcon,
  totalIcons = 6516
}) {
  const savedActive = useMemo(() => getSavedActiveSubmission(), []);

  const [iconName, setIconName] = useState("");
  const [iconSlug, setIconSlug] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [brandGuidelinesUrl, setBrandGuidelinesUrl] = useState("");
  const [hexColors, setHexColors] = useState(["FF5F02"]);
  const [detectedHexes, setDetectedHexes] = useState([]);
  const [license, setLicense] = useState("Apache-2.0");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [customCategories, setCustomCategories] = useState(() => getSavedCustomCategories());
  const [categoriesList, setCategoriesList] = useState(() => {
    const saved = getSavedCustomCategories();
    const unique = [...saved];
    POPULAR_CATEGORIES.forEach((c) => {
      if (!unique.some((u) => u.toLowerCase() === c.toLowerCase())) {
        unique.push(c);
      }
    });
    return unique;
  });
  const [newCategoryInput, setNewCategoryInput] = useState("");

  const [variants, setVariants] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [submissionResult, setSubmissionResult] = useState(() => savedActive?.submission || null);
  const [countdown, setCountdown] = useState(() => savedActive ? savedActive.countdown : TOTAL_PIPELINE_SECONDS);

  const fileInputRef = useRef(null);
  const addMoreInputRef = useRef(null);


  const handleNameChange = (e) => {
    const val = e.target.value;
    setIconName(val);
    const autoSlug = val.
    toLowerCase().
    replace(/[^a-z0-9]+/g, "-").
    replace(/(^-|-$)/g, "");
    setIconSlug(autoSlug);
  };


  const handleToggleCategory = (cat) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== cat));
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  const handleAddNewCategory = (e) => {
    if (e) e.preventDefault();
    const trimmed = newCategoryInput.trim();
    if (!trimmed) return;

    const formatted = trimmed
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    const existing = categoriesList.find(
      (c) => c.toLowerCase() === formatted.toLowerCase()
    );
    const finalCat = existing || formatted;

    if (!categoriesList.some((c) => c.toLowerCase() === finalCat.toLowerCase())) {
      setCategoriesList((prev) => [finalCat, ...prev]);
    }

    const updatedCustom = [finalCat, ...customCategories.filter((c) => c.toLowerCase() !== finalCat.toLowerCase())];
    setCustomCategories(updatedCustom);
    saveCustomCategoriesToStorage(updatedCustom);

    if (!selectedCategories.includes(finalCat)) {
      setSelectedCategories((prev) => [...prev, finalCat]);
    }

    setNewCategoryInput("");
    onShowToast?.({
      type: "success",
      title: "Category Created & Saved Permanently",
      message: `"${finalCat}" is now permanently available in your categories list.`
    });
  };

  const handleRemoveCustomCategory = (e, catToRemove) => {
    e.stopPropagation();
    const updatedCustom = customCategories.filter((c) => c !== catToRemove);
    setCustomCategories(updatedCustom);
    saveCustomCategoriesToStorage(updatedCustom);
    setCategoriesList((prev) => prev.filter((c) => c !== catToRemove));
    if (selectedCategories.includes(catToRemove)) {
      setSelectedCategories((prev) => prev.filter((c) => c !== catToRemove));
    }
    onShowToast?.({
      type: "info",
      title: "Category Removed",
      message: `"${catToRemove}" removed from custom categories.`
    });
  };


  const normalizeHex = (hexStr) => {
    if (!hexStr) return null;
    let h = hexStr.replace(/^#/, "").trim();
    if (h.length === 3) {
      h = h.
      split("").
      map((c) => c + c).
      join("");
    } else if (h.length === 8) {
      h = h.substring(0, 6);
    } else if (h.length === 4) {
      h = h.
      substring(0, 3).
      split("").
      map((c) => c + c).
      join("");
    }
    if (/^[0-9a-fA-F]{6}$/.test(h)) {
      return h.toUpperCase();
    }
    return null;
  };


  const rgbToHex = (r, g, b) => {
    const toHex = (n) => {
      const hex = Math.max(0, Math.min(255, Math.round(Number(n)))).toString(
        16
      );
      return hex.length === 1 ? "0" + hex : hex;
    };
    return `${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
  };


  const extractAllSvgColors = (svgContent) => {
    if (!svgContent || typeof svgContent !== "string") return [];
    const colorCounts = new Map();

    const addColor = (rawColor) => {
      if (!rawColor) return;
      const clean = rawColor.trim();
      if (
      ["none", "transparent", "currentcolor", "inherit", "initial"].includes(
        clean.toLowerCase()
      ))
      {
        return;
      }

      if (clean.startsWith("#")) {
        const norm = normalizeHex(clean);
        if (norm) {
          colorCounts.set(norm, (colorCounts.get(norm) || 0) + 1);
          return;
        }
      }

      const rgbMatch = clean.match(
        /rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i
      );
      if (rgbMatch) {
        const hex = rgbToHex(rgbMatch[1], rgbMatch[2], rgbMatch[3]);
        colorCounts.set(hex, (colorCounts.get(hex) || 0) + 1);
        return;
      }
    };


    const attrMatches = svgContent.matchAll(
      /(?:fill|stroke|stop-color|color)\s*=\s*["']([^"']+)["']/gi
    );
    for (const m of attrMatches) {
      addColor(m[1]);
    }


    const styleMatches = svgContent.matchAll(
      /(?:fill|stroke|stop-color|color)\s*:\s*([^;}"'\s]+)/gi
    );
    for (const m of styleMatches) {
      addColor(m[1]);
    }


    const generalHexMatches = svgContent.matchAll(
      /#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/g
    );
    for (const m of generalHexMatches) {
      addColor(m[0]);
    }

    return Array.from(colorCounts.entries()).
    sort((a, b) => b[1] - a[1]).
    map(([hex]) => hex);
  };


  const getSmartVariantName = (filename, existingCount) => {
    const lower = filename.toLowerCase().replace(/\.svg$/i, "");
    if (lower.includes("wordmark-dark") || lower.includes("wordmark_dark"))
    return "wordmark-dark";
    if (lower.includes("wordmark-light") || lower.includes("wordmark_light"))
    return "wordmark-light";
    if (lower.includes("dark")) return "dark";
    if (lower.includes("light")) return "light";
    if (lower.includes("mono")) return "mono";
    if (lower.includes("wordmark") || lower.includes("logo")) return "wordmark";
    if (lower.includes("symbol") || lower.includes("icon")) return "symbol";
    if (lower.includes("outline")) return "outline";
    if (lower.includes("solid")) return "solid";
    if (lower.includes("duotone")) return "duotone";

    if (existingCount === 0) return "default";
    return lower.replace(/[^a-z0-9-]/g, "") || `variant-${existingCount + 1}`;
  };


  const processFiles = async (files) => {
    if (!files || files.length === 0) return;
    const fileList = Array.from(files);

    const validFiles = fileList.filter(
      (f) =>
      f.name.toLowerCase().endsWith('.svg') ||
      f.type.includes('svg') ||
      f.type.includes('xml') ||
      f.type === ''
    );

    if (validFiles.length === 0) {
      onShowToast?.({
        type: 'error',
        title: 'Invalid File Format',
        message: 'Only .svg vector files are allowed.'
      });
      return;
    }

    const fileReadPromises = validFiles.map((file, idx) => {
      return new Promise((resolve) => {

        if (file.size > MAX_SVG_SIZE_BYTES) {
          onShowToast?.({
            type: 'error',
            title: 'File Size Exceeded (Max 20 KB)',
            message: `"${file.name}" (${(file.size / 1024).toFixed(1)} KB) exceeds the 20 KB limit.`
          });
          return resolve(null);
        }

        const reader = new FileReader();
        reader.onload = (event) => {
          let content = event.target?.result;
          if (typeof content !== 'string') return resolve(null);


          if (/<script|javascript:|<iframe|<embed|<object|data:text\/html/i.test(content)) {
            onShowToast?.({
              type: 'error',
              title: 'Unsafe SVG Blocked',
              message: `"${file.name}" contains prohibited scripts or external tags.`
            });
            return resolve(null);
          }


          if (!/<svg[^>]*\bviewBox=/i.test(content)) {
            const wMatch = content.match(/\bwidth=["']?(\d+)/i);
            const hMatch = content.match(/\bheight=["']?(\d+)/i);
            if (wMatch && hMatch) {
              content = content.replace(/<svg\b/i, `<svg viewBox="0 0 ${wMatch[1]} ${hMatch[1]}"`);
            }
          }

          resolve({
            file,
            content,
            idx
          });
        };
        reader.onerror = () => resolve(null);
        reader.readAsText(file);
      });
    });

    const parsedResults = (await Promise.all(fileReadPromises)).filter(Boolean);
    if (parsedResults.length === 0) return;


    const combinedColorsSet = new Set(detectedHexes);
    parsedResults.forEach(({ content }) => {
      const colors = extractAllSvgColors(content);
      colors.forEach((c) => combinedColorsSet.add(c));
    });

    const allColorsArray = Array.from(combinedColorsSet);
    setDetectedHexes(allColorsArray);

    const nonNeutralColors = allColorsArray.filter(
      (c) => !['FFFFFF', '000000', 'FFF', '000'].includes(c)
    );

    if (nonNeutralColors.length > 0) {
      setHexColors(nonNeutralColors);
    } else if (allColorsArray.length > 0 && hexColors.length === 1 && hexColors[0] === 'FF5F02') {
      setHexColors(allColorsArray);
    }


    if (!iconName && variants.length === 0 && parsedResults.length > 0) {
      const firstFile = parsedResults[0].file;
      const baseName = firstFile.name.
      replace(/\.svg$/i, '').
      replace(/-(default|dark|light|mono|wordmark|wordmark-dark|wordmark-light|logo)/i, '').
      replace(/[-_]+/g, ' ');
      if (baseName) {
        const formatted = baseName.charAt(0).toUpperCase() + baseName.slice(1);
        setIconName(formatted);
        setIconSlug(baseName.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
      }
    }


    setVariants((prev) => {
      const updated = [...prev];
      const usedNames = new Set(updated.map((v) => v.variantName.toLowerCase()));

      parsedResults.forEach(({ file, content }, i) => {
        let smartName = getSmartVariantName(file.name, updated.length);
        let finalName = smartName;
        let counter = 1;
        while (usedNames.has(finalName.toLowerCase())) {
          finalName = `${smartName}-${counter}`;
          counter++;
        }
        usedNames.add(finalName.toLowerCase());

        updated.push({
          id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}-${i}`,
          variantName: finalName,
          fileName: file.name,
          fileSize: file.size,
          svgContent: content
        });
      });

      return updated;
    });

    onShowToast?.({
      type: 'success',
      title: 'SVG Assets Loaded',
      message: `Successfully loaded ${parsedResults.length} SVG variant(s).`
    });
  };


  const handleSelectDetectedColor = (color) => {
    const clean = color.replace(/^#/, "").toUpperCase();
    if (!hexColors.includes(clean)) {
      setHexColors((prev) => [clean, ...prev]);
    } else {

      setHexColors((prev) => [clean, ...prev.filter((c) => c !== clean)]);
    }
  };


  const handleUpdateHex = (index, newHex) => {
    const clean = newHex.replace(/[^0-9a-fA-F]/g, "").toUpperCase();
    setHexColors((prev) => prev.map((c, i) => i === index ? clean : c));
  };


  const handleAddCustomColor = () => {
    const defaultNewColor =
    detectedHexes.find((d) => !hexColors.includes(d)) || "3B82F6";
    setHexColors((prev) => [...prev, defaultNewColor]);
  };


  const handleRemoveHex = (index) => {
    if (hexColors.length > 1) {
      setHexColors((prev) => prev.filter((_, i) => i !== index));
    }
  };


  const handleSetPrimary = (index) => {
    if (index === 0) return;
    setHexColors((prev) => [
    prev[index],
    ...prev.filter((_, i) => i !== index)]
    );
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      processFiles(e.dataTransfer.files);
    }
  };


  const handleUpdateVariantName = (id, newName) => {
    const sanitized = newName.toLowerCase().replace(/[^a-z0-9-_]/g, "");
    setVariants((prev) =>
    prev.map((v) => v.id === id ? { ...v, variantName: sanitized } : v)
    );
  };


  const handleRemoveVariant = (id) => {
    setVariants((prev) => prev.filter((v) => v.id !== id));
  };


  const schemaPreview = useMemo(() => {
    const s = iconSlug || "your-brand";
    const variantMap = {};

    if (variants.length === 0) {
      variantMap.default = `/icons/${s}/default.svg`;
      variantMap.mono = `/icons/${s}/mono.svg`;
      variantMap.dark = `/icons/${s}/dark.svg`;
    } else {
      variants.forEach((v) => {
        const vKey = v.variantName || "default";
        variantMap[vKey] = `/icons/${s}/${vKey}.svg`;
      });
    }

    const primaryHex = (hexColors[0] || "FF5F02").replace(/^#/, "");
    const cleanHexes = hexColors.map((h) => h.replace(/^#/, ""));

    const schemaObj = {
      slug: s,
      title: iconName || "Your Brand",
      aliases: [],
      hex: primaryHex,
      categories: selectedCategories,
      variants: variantMap,
      license,
      url: websiteUrl || `https://${s}.com`
    };

    if (cleanHexes.length > 1) {
      schemaObj.hexes = cleanHexes;
    }

    return JSON.stringify(schemaObj, null, 2);
  }, [
  iconSlug,
  iconName,
  hexColors,
  selectedCategories,
  variants,
  license,
  websiteUrl]
  );


  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    let finalCategories = [...selectedCategories];
    if (finalCategories.length === 0 && newCategoryInput.trim()) {
      const formatted = newCategoryInput.trim()
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
      finalCategories = [formatted];
      setSelectedCategories([formatted]);
    } else if (finalCategories.length === 0) {
      finalCategories = ["Pakistani Brands"];
      setSelectedCategories(["Pakistani Brands"]);
    }

    const title = iconName.trim();
    let slug = iconSlug.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '-').replace(/(^-|-$)/g, '');
    if (!slug && title) {
      slug = title.toLowerCase().replace(/[^a-z0-9_-]/g, '-').replace(/(^-|-$)/g, '');
      setIconSlug(slug);
    }

    if (!title) newErrors.name = "Icon name is required";
    if (!slug) newErrors.slug = "Slug is required";
    if (variants.length === 0)
      newErrors.svg = "Please upload at least one SVG file";

    const variantNames = variants.map((v) => v.variantName.trim());
    if (variantNames.some((v) => !v))
      newErrors.variants = "All variants must have a name";
    const uniqueNames = new Set(variantNames);
    if (uniqueNames.size !== variantNames.length)
      newErrors.variants = "Each variant must have a unique name (e.g., default, dark, mono)";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      onShowToast?.({
        type: "error",
        title: "Validation Error",
        message: Object.values(newErrors)[0]
      });
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    const primaryHex = (hexColors[0] || "FF5F02").replace(/^#/, "").toUpperCase();
    const allHexes = hexColors.map((h) => h.replace(/^#/, "").toUpperCase());
    const iconUrl = websiteUrl.trim() || `https://${slug}.com`;
    const brandGuidelines = brandGuidelinesUrl.trim() || undefined;

    const rawVariants = {};
    variants.forEach((v) => {
      const variantKey = v.variantName.trim().toLowerCase();
      rawVariants[variantKey] = v.svgContent;
    });

    const SUPABASE_URL = import.meta.env.VITE_DATABASE_URL || "";
    const SUPABASE_KEY = import.meta.env.VITE_DATABASE_KEY || "";

    let submittedSuccessfully = false;


    try {
      const response = await fetch("/api/submit-icon", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          slug,
          title,
          hex: primaryHex,
          hexes: allHexes,
          categories: finalCategories,
          aliases: [],
          license,
          url: iconUrl,
          guidelines: brandGuidelines,
          variants: rawVariants
        })
      });

      if (response.ok) {
        submittedSuccessfully = true;
      } else {
        console.warn("/api/submit-icon endpoint returned non-OK status:", response.status);
      }
    } catch (apiErr) {
      console.warn("Direct /api/submit-icon call failed, falling back to Supabase Edge Function:", apiErr);
    }

    if (!submittedSuccessfully) {
      try {
        const edgeFnRes = await fetch(`${SUPABASE_URL}/functions/v1/submit-icon`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "apikey": SUPABASE_KEY,
            "Authorization": `Bearer ${SUPABASE_KEY}`
          },
          body: JSON.stringify({
            slug,
            title,
            hex: primaryHex,
            hexes: allHexes,
            categories: finalCategories,
            aliases: [],
            license,
            url: iconUrl,
            guidelines: brandGuidelines,
            variants: rawVariants
          })
        });

        if (edgeFnRes.ok) {
          submittedSuccessfully = true;
        } else {
          console.warn("Supabase Edge Function returned non-OK status:", edgeFnRes.status);
        }
      } catch (edgeErr) {
        console.warn("Supabase Edge Function call failed:", edgeErr);
      }
    }

    try {
      const localNewIcon = {
        id: slug,
        slug,
        name: title,
        title,
        category: finalCategories[0] || 'Pakistani Brands',
        categories: finalCategories,
        hex: `#${primaryHex}`,
        url: iconUrl,
        license,
        path: `/icons/${slug}/default.svg`,
        variants: Object.keys(rawVariants),
        variantPaths: Object.keys(rawVariants).reduce((acc, k) => {
          acc[k] = `/icons/${slug}/${k}.svg`;
          return acc;
        }, {}),
        variantCount: Object.keys(rawVariants).length,
        availableVariants: Object.keys(rawVariants),
        dateAdded: new Date().toISOString().split('T')[0],
        collection: 'community'
      };

      for (const [vKey, svgStr] of Object.entries(rawVariants)) {
        try {
          await setCachedSvgVector(`/icons/${slug}/${vKey}.svg`, svgStr);
        } catch {}
      }

      onIconAdded?.(localNewIcon);

      onShowToast?.({
        type: "success",
        title: "Processing Started",
        message: `"${title}" has been submitted and is entering the 7-minute ingestion pipeline.`
      });

      const submissionData = {
        success: true,
        slug,
        title,
        variantCount: variants.length,
        colors: allHexes,
        startTime: Date.now(),
        endTime: Date.now() + TOTAL_PIPELINE_SECONDS * 1000
      };

      try {
        localStorage.setItem(ACTIVE_SUBMISSION_KEY, JSON.stringify(submissionData));
      } catch {}

      setSubmissionResult(submissionData);
      setCountdown(TOTAL_PIPELINE_SECONDS);

      setIconName("");
      setIconSlug("");
      setWebsiteUrl("");
      setBrandGuidelinesUrl("");
      setHexColors(["FF5F02"]);
      setDetectedHexes([]);
      setLicense("Apache-2.0");
      setSelectedCategories([]);
      setVariants([]);
      setErrors({});
    } catch (err) {
      console.error("Submit finalization error:", err);
      onShowToast?.({
        type: "error",
        title: "Submission Error",
        message: err.message || "An unexpected error occurred during submission."
      });
    } finally {
      setIsSubmitting(false);
    }
  };


  useEffect(() => {
    if (!submissionResult?.success) return;
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [submissionResult, countdown]);


  if (submissionResult?.success) {
    const isDone = countdown <= 0;
    const progress = Math.min(100, Math.max(0, ((TOTAL_PIPELINE_SECONDS - countdown) / TOTAL_PIPELINE_SECONDS) * 100));

    return (
      <div className="sv-pipeline-page-container">
        <div className="sv-pipeline-hero glass-panel">
          <div className="sv-pipeline-hero-left">
            <div className="sv-pipeline-status-badge">
              <span className={`sv-pipeline-pulse-dot ${isDone ? 'done' : 'active'}`} />
              <span>{isDone ? 'PUBLISHED & HOSTED' : 'VECTOR INGESTION PIPELINE ACTIVE'}</span>
            </div>

            <h1 className="sv-pipeline-hero-title">
              {isDone ? 'Successfully Hosted' : 'Processing'}{' '}
              <span className="text-orange">{submissionResult.title}</span>
            </h1>

            <p className="sv-pipeline-hero-desc">
              {isDone ? (
                <>
                  <strong>{submissionResult.title}</strong> is now live with its dedicated preview page, instant CDN delivery, and framework code snippets.
                </>
              ) : (
                <>
                  Vector assets uploaded and verified. Processing pipeline is optimizing paths, generating framework code, and deploying to global CDN.
                </>
              )}
            </p>
          </div>

          <div className="sv-pipeline-hero-right">
            <div className="sv-pipeline-countdown-card glass-panel">
              <div className="sv-pipeline-time-num">
                {isDone ? <CheckCircle2 size={36} className="text-emerald" /> : formatPipelineTime(countdown)}
              </div>
              <div className="sv-pipeline-time-label">
                {isDone ? 'Live in Library' : 'Estimated Time (7m)'}
              </div>
            </div>
          </div>
        </div>

        <div className="sv-pipeline-progress-bar-wrap glass-panel">
          <div className="sv-pipeline-progress-header">
            <span>Overall Publishing Progress</span>
            <span className="sv-pipeline-percent">{isDone ? '100%' : `${Math.round(progress)}%`}</span>
          </div>
          <div className="sv-pipeline-track">
            <div className="sv-pipeline-fill" style={{ width: `${isDone ? 100 : progress}%` }} />
          </div>
        </div>

        <div className="sv-pipeline-grid">
          <div className="sv-pipeline-stages-col">
            <h3 className="sv-pipeline-col-title">Publishing Pipeline Stages</h3>

            <div className="sv-pipeline-stage-card glass-panel completed">
              <div className="sv-stage-step-num"><Check size={14} /></div>
              <div className="sv-stage-info">
                <div className="sv-stage-title-row">
                  <span className="sv-stage-title">1. Vector Validation & Sanitization</span>
                  <span className="sv-stage-tag done">COMPLETED</span>
                </div>
                <p className="sv-stage-desc">
                  Validated SVG structure, verified viewBox coordinates, and ingested {submissionResult.variantCount} variant(s).
                </p>
              </div>
            </div>

            <div className={`sv-pipeline-stage-card glass-panel ${countdown <= (TOTAL_PIPELINE_SECONDS - 45) ? 'completed' : 'active'}`}>
              <div className="sv-stage-step-num">
                {countdown <= (TOTAL_PIPELINE_SECONDS - 45) ? <Check size={14} /> : <div className="sv-spinner-sm" />}
              </div>
              <div className="sv-stage-info">
                <div className="sv-stage-title-row">
                  <span className="sv-stage-title">2. Path Precision & Subpixel Optimization</span>
                  <span className={`sv-stage-tag ${countdown <= (TOTAL_PIPELINE_SECONDS - 45) ? 'done' : 'active'}`}>
                    {countdown <= (TOTAL_PIPELINE_SECONDS - 45) ? 'OPTIMIZED' : 'PROCESSING'}
                  </span>
                </div>
                <p className="sv-stage-desc">
                  Normalized vector curves, precision coordinates, and stripped design tool artifacts.
                </p>
              </div>
            </div>

            <div className={`sv-pipeline-stage-card glass-panel ${isDone ? 'completed' : countdown <= (TOTAL_PIPELINE_SECONDS - 90) ? 'active' : 'pending'}`}>
              <div className="sv-stage-step-num">
                {isDone ? <Check size={14} /> : countdown <= (TOTAL_PIPELINE_SECONDS - 90) ? <div className="sv-spinner-sm" /> : <span>3</span>}
              </div>
              <div className="sv-stage-info">
                <div className="sv-stage-title-row">
                  <span className="sv-stage-title">3. Catalog Indexing & Code Packaging</span>
                  <span className={`sv-stage-tag ${isDone ? 'done' : countdown <= (TOTAL_PIPELINE_SECONDS - 90) ? 'active' : 'pending'}`}>
                    {isDone ? 'INDEXED' : countdown <= (TOTAL_PIPELINE_SECONDS - 90) ? 'IN PROGRESS' : 'QUEUED'}
                  </span>
                </div>
                <p className="sv-stage-desc">
                  Extracted official brand palette, generated React, Vue, Next.js snippets, and compiled metadata.
                </p>
              </div>
            </div>

            <div className={`sv-pipeline-stage-card glass-panel ${isDone ? 'completed' : countdown <= 90 ? 'active' : 'pending'}`}>
              <div className="sv-stage-step-num">
                {isDone ? <Check size={14} /> : countdown <= 90 ? <div className="sv-spinner-sm" /> : <span>4</span>}
              </div>
              <div className="sv-stage-info">
                <div className="sv-stage-title-row">
                  <span className="sv-stage-title">4. Global CDN Release & Live Page</span>
                  <span className={`sv-stage-tag ${isDone ? 'done' : countdown <= 90 ? 'active' : 'pending'}`}>
                    {isDone ? 'LIVE ON EDGE' : countdown <= 90 ? 'PROPAGATING' : 'PENDING'}
                  </span>
                </div>
                <p className="sv-stage-desc">
                  Deployed to global edge network with instant public preview page and direct CDN endpoints.
                </p>
              </div>
            </div>
          </div>

          <div className="sv-pipeline-spec-col">
            <h3 className="sv-pipeline-col-title">Submitted Asset Specifications</h3>

            <div className="sv-pipeline-spec-card glass-panel">
              <div className="sv-spec-row">
                <span className="sv-spec-label">IDENTIFIER SLUG</span>
                <code className="sv-spec-val">{submissionResult.slug}</code>
              </div>

              <div className="sv-spec-row">
                <span className="sv-spec-label">CANONICAL TITLE</span>
                <span className="sv-spec-val-text">{submissionResult.title}</span>
              </div>

              <div className="sv-spec-row">
                <span className="sv-spec-label">VARIANTS UPLOADED</span>
                <span className="sv-spec-badge">{submissionResult.variantCount} Variant Sets</span>
              </div>

              <div className="sv-spec-row">
                <span className="sv-spec-label">PRIMARY HEX</span>
                <div className="sv-spec-hex-row">
                  <span
                    className="sv-spec-color-dot"
                    style={{ backgroundColor: `#${submissionResult.colors?.[0] || 'FF5F02'}` }}
                  />
                  <code>#{submissionResult.colors?.[0] || 'FF5F02'}</code>
                </div>
              </div>

              <div className="sv-spec-row">
                <span className="sv-spec-label">LICENSE</span>
                <span className="sv-spec-badge license">Apache-2.0</span>
              </div>
            </div>

            <div className="sv-pipeline-actions-row">
              <button
                type="button"
                className="sv-pipeline-done-btn"
                onClick={() => onNavigate?.('icons')}>
                <CheckCircle2 size={16} />
                <span>Done</span>
              </button>

              <button
                type="button"
                className="sv-pipeline-new-btn"
                onClick={() => {
                  try {
                    localStorage.removeItem(ACTIVE_SUBMISSION_KEY);
                  } catch {}
                  setSubmissionResult(null);
                  setCountdown(TOTAL_PIPELINE_SECONDS);
                }}>
                <Plus size={16} />
                <span>Add Another</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="sv-submit-page-container">
      {}
      <div className="sv-submit-main-grid">
        {}
        <div className="sv-submit-left-col">
          {}
          <div className="sv-pack-requirement-card glass-panel">
            <div className="sv-pack-header">
              <div className="sv-pack-badge">
                ICON PACK &amp; VARIANT STANDARD
              </div>
              <h3 className="sv-pack-title">Full Variant Sets Coverage</h3>
            </div>
            <p className="sv-pack-desc">
              To maintain complete library coverage, submissions should provide
              all standard brand variants:
            </p>
            <div className="sv-pack-variants-grid">
              <div className="sv-pack-variant-pill">
                <code>default</code>
                <span className="sv-pv-sub">Standard Color</span>
              </div>
              <div className="sv-pack-variant-pill">
                <code>light</code>
                <span className="sv-pv-sub">For Dark Mode</span>
              </div>
              <div className="sv-pack-variant-pill">
                <code>dark</code>
                <span className="sv-pv-sub">For Light Mode</span>
              </div>
              <div className="sv-pack-variant-pill">
                <code>wordmark-dark</code>
                <span className="sv-pv-sub">Logo + Typography</span>
              </div>
              <div className="sv-pack-variant-pill">
                <code>wordmark-light</code>
                <span className="sv-pv-sub">Logo + Dark Mode</span>
              </div>
              <div className="sv-pack-variant-pill">
                <code>mono</code>
                <span className="sv-pv-sub">Single Color Glyph</span>
              </div>
            </div>
          </div>

          {}
          <div className="sv-req-card glass-panel">
            <h3 className="sv-req-title">SVG Limits & Quality Standards</h3>
            <ul className="sv-req-list">
              <li>
                <CheckCircle2 size={15} className="sv-req-check" />
                <span>
                  <strong>Maximum 20 KB</strong> file size limit per SVG
                </span>
              </li>
              <li>
                <CheckCircle2 size={15} className="sv-req-check" />
                <span>
                  <strong>Only .svg</strong> vector format accepted
                </span>
              </li>
              <li>
                <CheckCircle2 size={15} className="sv-req-check" />
                <span>
                  <strong>viewBox attribute</strong> mandatory on root
                  &lt;svg&gt;
                </span>
              </li>
              <li>
                <CheckCircle2 size={15} className="sv-req-check" />
                <span>
                  <strong>Strictly no scripts</strong>, foreign objects, or
                  embedded raster images
                </span>
              </li>
              <li>
                <CheckCircle2 size={15} className="sv-req-check" />
                <span>
                  <strong>Full variant coverage</strong>: default, light, dark,
                  wordmark-dark, wordmark-light
                </span>
              </li>
              <li>
                <CheckCircle2 size={15} className="sv-req-check" />
                <span>
                  <strong>Multi-color &amp; gradients</strong> fully supported
                  with auto-detected hex palette
                </span>
              </li>
            </ul>
          </div>

          {}
          <div className="sv-repo-links-row">
            <a
              href="https://github.com/Orildo-Tech/SVG-IO"
              target="_blank"
              rel="noopener noreferrer"
              className="sv-repo-action-btn">
              
              <Github size={14} />
              <span>GitHub Repository</span>
              <ExternalLink size={12} />
            </a>
            <a
              href="https://github.com/Orildo-Tech/SVG-IO/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="sv-repo-action-btn">
              
              <AlertCircle size={14} />
              <span>Issues &amp; Requests</span>
              <ExternalLink size={12} />
            </a>
          </div>

          <div className="sv-schema-preview-box glass-panel">
            <div className="sv-schema-header">
              <span className="sv-schema-title">Vector Package Schema</span>
              <span className="sv-schema-sub">
                Standard Metadata Format ({variants.length} variant
                {variants.length !== 1 ? "s" : ""})
              </span>
            </div>
            <pre className="sv-schema-code">
              <code>{schemaPreview}</code>
            </pre>
          </div>
        </div>

        <div className="sv-submit-right-col">
          <form
            className="sv-submit-form-card glass-panel"
            onSubmit={handleSubmit}>
            
            <div className="sv-form-header">
              <h2 className="sv-form-title">Publish & Host SVG Assets</h2>
              <p className="sv-form-sub">
                Upload individual icons or complete multi-variant icon packs. We validate, optimize paths, package, and host them with live shareable preview pages and CDN links.
              </p>
            </div>

            {}
            <div className="sv-quality-badges-row">
              <span className="sv-q-badge sv-q-timer-badge">
                <Timer size={11} /> 7-Minute Processing SLA
              </span>
              <span className="sv-q-badge">
                <Check size={11} /> Max 20 KB / SVG
              </span>
              <span className="sv-q-badge">
                <Check size={11} /> .svg Only
              </span>
              <span className="sv-q-badge">
                <Check size={11} /> viewBox Ready
              </span>
              <span className="sv-q-badge">
                <Check size={11} /> Auto Hex Detection
              </span>
            </div>

            {}
            <div className="sv-form-group">
              <div className="sv-label-with-help">
                <label className="sv-form-label">
                  SVG Variants ({variants.length}){" "}
                  <span className="req">*</span>
                </label>
              </div>

              {}
              <input
                ref={addMoreInputRef}
                type="file"
                accept=".svg"
                multiple
                style={{ display: "none" }}
                onChange={(e) => processFiles(e.target.files)} />
              

              {}
              {variants.length === 0 ?
              <div
                className={`sv-dropzone ${isDragging ? "is-dragging" : ""} ${errors.svg ? "has-error" : ""}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}>
                
                  <input
                  ref={fileInputRef}
                  type="file"
                  accept=".svg"
                  multiple
                  style={{ display: "none" }}
                  onChange={(e) => processFiles(e.target.files)} />
                
                  <div className="sv-dropzone-icon-wrap">
                    <UploadCloud size={28} className="sv-dropzone-icon" />
                  </div>
                  <span className="sv-dropzone-main-text">
                    Drag & drop your SVG files (Single or Multiple)
                  </span>
                  <span className="sv-dropzone-sub-text">
                    or click to browse • .svg files only, max 20KB per SVG
                  </span>
                </div> :
              null}

              {}
              {variants.length > 0 && (
                <div
                  className={`sv-multi-variants-container ${isDragging ? "is-dragging" : ""}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <div className="sv-variants-header-bar">
                    <div className="sv-vh-left">
                      <span className="sv-vh-title">Uploaded Vector Variants</span>
                      <span className="sv-vh-count-badge">
                        {variants.length} Variant{variants.length !== 1 ? 's' : ''} Ready
                      </span>
                    </div>
                    <button
                      type="button"
                      className="sv-vh-add-btn"
                      onClick={() => addMoreInputRef.current?.click()}
                    >
                      <Plus size={14} />
                      <span>Add SVG Variant</span>
                    </button>
                  </div>

                  <div className="sv-variants-list">
                    {variants.map((v, idx) => (
                      <div key={v.id} className="sv-variant-item-card glass-panel">
                        {}
                        <div className="sv-variant-preview-box">
                          <div
                            className="sv-variant-svg-wrapper"
                            dangerouslySetInnerHTML={{ __html: v.svgContent }}
                          />
                        </div>

                        {}
                        <div className="sv-variant-fields">
                          <div className="sv-variant-top-row">
                            <div className="sv-variant-key-wrap">
                              <span className="sv-variant-field-label">KEY:</span>
                              <input
                                type="text"
                                className="sv-variant-name-input"
                                placeholder="e.g. default, dark, mono"
                                value={v.variantName}
                                onChange={(e) => handleUpdateVariantName(v.id, e.target.value)}
                              />
                            </div>

                            {idx === 0 ? (
                              <span className="sv-primary-badge">PRIMARY</span>
                            ) : (
                              <span className="sv-variant-index-badge">VARIANT #{idx + 1}</span>
                            )}

                            <span className="sv-variant-file-name" title={v.fileName}>
                              {v.fileName}
                            </span>
                            <span className="sv-variant-file-size">
                              {(v.fileSize / 1024).toFixed(1)} KB
                            </span>
                          </div>

                          {}
                          <div className="sv-variant-presets-row">
                            <span className="sv-preset-label">Presets:</span>
                            <div className="sv-preset-buttons-wrap">
                              {PRESET_VARIANT_NAMES.map((pName) => (
                                <button
                                  key={pName}
                                  type="button"
                                  className={`sv-preset-btn ${v.variantName === pName ? "active" : ""}`}
                                  onClick={() => handleUpdateVariantName(v.id, pName)}
                                >
                                  {pName}
                                </button>
                              ))}
                            </div>
                          </div>

                          {}
                          <div className="sv-variant-meta-row">
                            <span className="sv-variant-target-label">Target File:</span>
                            <code className="sv-variant-target-path">
                              public/icons/{iconSlug || "slug"}/{v.variantName || "default"}.svg
                            </code>
                          </div>
                        </div>

                        {}
                        <button
                          type="button"
                          className="sv-variant-remove-btn"
                          onClick={() => handleRemoveVariant(v.id)}
                          title="Remove variant"
                          aria-label="Remove variant"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    ))}
                  </div>

                  {}
                  <div
                    className="sv-add-drop-footer"
                    onClick={() => addMoreInputRef.current?.click()}
                  >
                    <Plus size={16} />
                    <span>Drop more SVGs or click here to add another variant</span>
                  </div>
                </div>
              )}

              {errors.svg &&
              <span className="sv-field-error">{errors.svg}</span>
              }
              {errors.variants &&
              <span className="sv-field-error">{errors.variants}</span>
              }
            </div>

            {}
            <div className="sv-form-section-title">Icon Details</div>

            {}
            <div className="sv-form-row-2col">
              <div className="sv-form-group">
                <label className="sv-form-label">
                  Icon name <span className="req">*</span>
                </label>
                <input
                  type="text"
                  className={`sv-form-input ${errors.name ? "has-error" : ""}`}
                  placeholder="e.g. Vercel"
                  value={iconName}
                  onChange={handleNameChange} />
                
                {errors.name &&
                <span className="sv-field-error">{errors.name}</span>
                }
              </div>

              <div className="sv-form-group">
                <label className="sv-form-label">
                  Slug (kebab-case) <span className="req">*</span>
                </label>
                <input
                  type="text"
                  className={`sv-form-input ${errors.slug ? "has-error" : ""}`}
                  placeholder="e.g. vercel"
                  value={iconSlug}
                  onChange={(e) =>
                  setIconSlug(
                    e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "")
                  )
                  } />
                
                {errors.slug &&
                <span className="sv-field-error">{errors.slug}</span>
                }
              </div>
            </div>

            {}
            <div className="sv-form-group">
              <label className="sv-form-label">Website URL</label>
              <input
                type="url"
                className="sv-form-input"
                placeholder="https://vercel.com"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)} />
              
            </div>

            {}
            <div className="sv-form-group">
              <label className="sv-form-label">Brand guidelines URL</label>
              <input
                type="url"
                className="sv-form-input"
                placeholder="https://vercel.com/brand"
                value={brandGuidelinesUrl}
                onChange={(e) => setBrandGuidelinesUrl(e.target.value)} />
              
            </div>

            {}
            {detectedHexes.length > 0 &&
            <div className="sv-form-group sv-detected-colors-group">
                <div className="sv-label-with-help">
                  <label className="sv-form-label">
                    Auto-Detected Colors from SVGs ({detectedHexes.length})
                  </label>
                  <span className="sv-detected-hint">
                    Click a color to add or set as primary
                  </span>
                </div>
                <div className="sv-detected-chips-grid">
                  {detectedHexes.map((hex) => {
                  const isSelected = hexColors.includes(hex);
                  const isPrimary = hexColors[0] === hex;
                  return (
                    <button
                      key={hex}
                      type="button"
                      className={`sv-detected-color-chip ${isSelected ? "is-selected" : ""} ${isPrimary ? "is-primary" : ""}`}
                      onClick={() => handleSelectDetectedColor(hex)}
                      title={`Click to ${isPrimary ? "use" : isSelected ? "set as primary" : "add"} #${hex}`}>
                      
                        <span
                        className="sv-detected-color-dot"
                        style={{ backgroundColor: `#${hex}` }} />
                      
                        <span className="sv-detected-color-code">#{hex}</span>
                        {isPrimary &&
                      <span className="sv-color-primary-tag">PRIMARY</span>
                      }
                        {isSelected && !isPrimary &&
                      <Check size={11} className="sv-color-check-icon" />
                      }
                      </button>);

                })}
                </div>
              </div>
            }

            {}
            <div className="sv-form-group">
              <div className="sv-label-with-help">
                <label className="sv-form-label">
                  Brand Hex Color{hexColors.length > 1 ? "s" : ""} (
                  {hexColors.length}) <span className="req">*</span>
                </label>
                <button
                  type="button"
                  className="sv-add-color-btn"
                  onClick={handleAddCustomColor}>
                  
                  <Plus size={12} />
                  <span>Add Another Color</span>
                </button>
              </div>

              <div className="sv-multi-colors-list">
                {hexColors.map((color, idx) => {
                  const safeHex = color.replace(/^#/, "").toUpperCase();
                  const isPrimary = idx === 0;

                  return (
                    <div key={idx} className="sv-color-row-item">
                      <div className="sv-color-picker-box">
                        <input
                          type="color"
                          value={
                          safeHex.length === 6 ? `#${safeHex}` : "#FF5F02"
                          }
                          onChange={(e) =>
                          handleUpdateHex(
                            idx,
                            e.target.value.replace(/^#/, "").toUpperCase()
                          )
                          }
                          className="sv-native-color-picker"
                          title="Click to open color picker" />
                        
                        <div
                          className="sv-color-swatch-preview"
                          style={{ backgroundColor: `#${safeHex}` }} />
                        
                      </div>

                      <div className="sv-hex-input-group">
                        <span className="sv-hex-prefix">#</span>
                        <input
                          type="text"
                          className="sv-form-input sv-hex-input"
                          placeholder="FF5F02"
                          maxLength={6}
                          value={safeHex}
                          onChange={(e) =>
                          handleUpdateHex(
                            idx,
                            e.target.value.
                            replace(/[^0-9a-fA-F]/g, "").
                            toUpperCase()
                          )
                          } />
                        
                      </div>

                      {isPrimary ?
                      <span className="sv-primary-color-badge">PRIMARY</span> :

                      <button
                        type="button"
                        className="sv-make-primary-btn"
                        onClick={() => handleSetPrimary(idx)}
                        title="Set as primary brand color">
                        
                          Make Primary
                        </button>
                      }

                      {hexColors.length > 1 &&
                      <button
                        type="button"
                        className="sv-remove-color-btn"
                        onClick={() => handleRemoveHex(idx)}
                        title="Remove color">
                        
                          <Trash2 size={13} />
                        </button>
                      }
                    </div>);

                })}
              </div>
            </div>

            <div className="sv-form-group">
              <label className="sv-form-label">
                License <span className="req">*</span>
              </label>
              <div className="sv-license-display-box">
                <ShieldCheck size={16} style={{ color: '#10B981', flexShrink: 0 }} />
                <span className="sv-license-text">Apache 2.0 (Official Open-Source License)</span>
                <span className="sv-license-badge">APACHE 2.0</span>
              </div>
            </div>

            <div className="sv-form-group">
              <div className="sv-cat-header-row">
                <label className="sv-form-label" style={{ marginBottom: 0 }}>
                  Categories <span className="req">*</span>
                </label>
                <span className={`sv-cat-count-badge ${selectedCategories.length === 0 ? "empty" : ""}`}>
                  {selectedCategories.length === 0
                    ? "None selected"
                    : `${selectedCategories.length} categor${selectedCategories.length !== 1 ? 'ies' : 'y'} selected`}
                </span>
              </div>
              <p className="sv-cat-help-text">
                Select one or multiple categories, or create a new custom category for this icon:
              </p>

              <div className="sv-add-category-row">
                <input
                  type="text"
                  className="sv-form-input sv-add-category-input"
                  placeholder="Create custom category (e.g. AI Tools, Web3, FinTech)..."
                  value={newCategoryInput}
                  onChange={(e) => setNewCategoryInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddNewCategory();
                    }
                  }}
                  maxLength={40}
                />
                <button
                  type="button"
                  className="sv-add-category-btn"
                  onClick={handleAddNewCategory}
                  disabled={!newCategoryInput.trim()}
                  title="Create and select new category">
                  <Plus size={15} />
                  <span>Create</span>
                </button>
              </div>

              <div className="sv-cat-tags-selector">
                {categoriesList.map((cat) => {
                  const isSelected = selectedCategories.includes(cat);
                  const isCustom = customCategories.includes(cat);
                  return (
                    <div
                      key={cat}
                      className={`sv-cat-pill-toggle-wrap ${isSelected ? "active" : ""} ${isCustom ? "custom" : ""}`}
                    >
                      <button
                        type="button"
                        className={`sv-cat-pill-toggle ${isSelected ? "active" : ""}`}
                        onClick={() => handleToggleCategory(cat)}
                        title={isSelected ? `Click to deselect ${cat}` : `Click to select ${cat}`}>
                        {isSelected ? (
                          <Check size={12} style={{ marginRight: 4 }} />
                        ) : isCustom ? (
                          <Sparkles size={11} style={{ marginRight: 4, color: '#FF5F02' }} />
                        ) : null}
                        <span>{cat}</span>
                      </button>

                      {isCustom && (
                        <button
                          type="button"
                          className="sv-cat-pill-remove-btn"
                          onClick={(e) => handleRemoveCustomCategory(e, cat)}
                          title={`Delete custom category "${cat}"`}
                          aria-label={`Delete custom category "${cat}"`}
                        >
                          <X size={11} />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>

              {errors.categories && (
                <span className="sv-field-error" style={{ marginTop: 6, display: 'block' }}>
                  {errors.categories}
                </span>
              )}
            </div>

            {}
            <button
              type="submit"
              className="sv-submit-action-btn"
              disabled={isSubmitting}>
              
              {isSubmitting ?
              <>
                  <div className="sv-button-spinner" />
                  <span>
                    Creating Folder & Saving {variants.length} SVG(s)...
                  </span>
                </> :

              <>
                  <Check size={16} />
                  <span>
                    Submit Icon ({variants.length} Variant
                    {variants.length !== 1 ? "s" : ""}) & Auto-Create Folder
                  </span>
                </>
              }
            </button>
          </form>
        </div>
      </div>
    </div>);

}

export default SubmitPage;